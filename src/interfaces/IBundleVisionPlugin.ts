import { Compiler } from 'webpack';
import { IExtractPackages, ITracePath, ICalculateSizes, IFindDuplicateModules } from '@interfaces';

interface IBundleVisionPlugin {
  numCriticalPaths: number;
  extractPackages: IExtractPackages;
  tracePath: ITracePath;
  calculateSizes: ICalculateSizes;
  findDuplicateModules: IFindDuplicateModules;
  processStats(stats: any) : Promise<never[] | undefined>;
  apply(compiler: Compiler): void;
}

export { IBundleVisionPlugin };
