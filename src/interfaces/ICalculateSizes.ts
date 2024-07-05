export interface ICalculateSizes {
    calculate(
      assets: any[],
      modules: any[],
      modulesPerformance: { name: string; size: number }[]
    ): { totalAssetsSize: number };
  }