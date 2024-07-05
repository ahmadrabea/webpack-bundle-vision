export interface ITracePath {
    trace(
      moduleId: any,
      modules: any[],
      currentPath: any[],
      visited: Set<any>,
      circularDependencies: string[]
    ): any[];
  }