import { injectable } from 'inversify';
import { ICalculateSizes } from '@interfaces';
import {filesize} from 'filesize';

@injectable()
class CalculateSizes implements ICalculateSizes {
  calculate(
    assets: any[],
    modules: any[],
    modulesPerformance: { name: string; size: number }[]
  ): { totalAssetsSize: number } {
    let totalAssetsSize = 0;

    assets.forEach((asset) => {
      totalAssetsSize += asset.size;
    });

    modules.forEach((module) => {
      const moduleName = module?.name || module.identifier || '(unknown)';
      const moduleSize = module.size;
      modulesPerformance.push({
        name: moduleName,
        size: moduleSize,
      });
    });

    return { totalAssetsSize };
  }
}

export { CalculateSizes };
