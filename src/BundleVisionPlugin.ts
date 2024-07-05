import { Compiler, WebpackPluginInstance } from 'webpack';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExtractPackages, ITracePath, ICalculateSizes, IFindDuplicateModules , IBundleVisionPlugin, Options } from '@interfaces';
import {filesize} from "filesize";

@injectable()
class BundleVisionPlugin implements WebpackPluginInstance, IBundleVisionPlugin {
  options: Options;
  numCriticalPaths: number;
  extractPackages: IExtractPackages;
  tracePath: ITracePath;
  calculateSizes: ICalculateSizes;
  findDuplicateModules: IFindDuplicateModules;
  outputPath: string | undefined;
  constructor(
    @inject(TYPES.Options) options: Options,
    @inject(TYPES.IExtractPackages)  extractPackages: IExtractPackages,
    @inject(TYPES.ITracePath)  tracePath: ITracePath,
    @inject(TYPES.ICalculateSizes)  calculateSizes: ICalculateSizes,
    @inject(TYPES.IFindDuplicateModules)  findDuplicateModules: IFindDuplicateModules,
  ){
    this.options = options;
    this.numCriticalPaths = 10;
    this.extractPackages = extractPackages;
    this.tracePath = tracePath; 
    this.calculateSizes = calculateSizes;
    this.findDuplicateModules = findDuplicateModules;

  }

  

  apply(compiler: Compiler) {
    compiler.hooks.done.tapPromise('BuildMetricsPlugin', async (stats) => {
      try {
        this.outputPath = compiler.options.output.path
        await this.processStats(stats.toJson());
        
      } catch (error) {
        console.error('Error processing stats:', error);
      }
    });
  }

  async processStats(stats: any) {
    // Destructure stats object
    const { modules, chunks, time, assets, entrypoints } = stats;
  
    // Initialize variables
    let allPaths: string[] = [];
    let criticalPaths: string[] = [];
    let circularDependencies: string[] = [];
    let modulesPerformance: { name: string; size: number }[] = [];
    let totalModulesSize = 0;
    let totalAssetsSize = 0;
    const buildTime = time;
    const assetsCount = assets.length;
    const chunksCount = chunks.length;
    const entryPointsCount = Object.keys(entrypoints).length;
  
    // Extract packages from modules
    this.extractPackages.extract(modules);
  
    // Process entry chunks to trace paths
    const entryChunks = chunks.filter((chunk: any) => chunk.entry);
    if (entryChunks.length === 0) {
      console.error('No entry chunks found in webpack stats.');
      return [];
    }
  
    entryChunks.forEach((entryChunk: any) => {
      const entryModuleIds = entryChunk.modules.map((module: any) => module.id);
      entryModuleIds.forEach((moduleId: any) => {
        const path = this.tracePath.trace(moduleId, modules, [], new Set(), circularDependencies);
        if (path.length > 0) {
          allPaths.push(path.join(' -> '));
        }
      });
    });
  
    // Calculate sizes of assets and modules
    const { totalAssetsSize: newTotalAssetsSize } = this.calculateSizes.calculate(assets, modules, modulesPerformance);
    totalAssetsSize = newTotalAssetsSize;
    totalModulesSize = modulesPerformance.reduce((acc, module) => acc + module.size, 0);
  
    // Find duplicate modules
    const duplicateModules = this.findDuplicateModules.find(modules);
  
    // Sort paths and select critical paths
    allPaths.sort((a, b) => b.split(' -> ').length - a.split(' -> ').length);
    criticalPaths = allPaths.slice(0, this.options.criticalPathsLimit||10);
    const topCriticalPaths = criticalPaths.filter((path)=> path.split(' -> ').length >= (this.options.criticalPathDepth || 10));
  
    // Write results to file
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(this.outputPath, this.options.path || "", this.options.fileName ||'bundle-vision.json');

    if (!fs.existsSync(path.join(this.outputPath, this.options.path || ""))) {
      fs.mkdirSync(path.join(this.outputPath, this.options.path || ""), { recursive: true });
    }
    
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          criticalPaths: topCriticalPaths,
          circularDependencies: circularDependencies,
          modulesSize: modulesPerformance.map((module)=>({name: module.name, size: filesize(module.size)})),
          buildTime: `${buildTime} ms`,
          assets: {count:assetsCount,items:assets},
          chunks: {count:chunksCount,items:chunks},
          entryPoints: {count:entryPointsCount,items:entrypoints},
          duplicateModules: {count:duplicateModules.size,items:duplicateModules},
          totalModulesSize: filesize(totalModulesSize),
          totalAssetsSize: filesize(totalAssetsSize)
        },
        null,
        2
      )
    );
  }
  
}

export { BundleVisionPlugin };
