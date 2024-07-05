import { injectable } from 'inversify';
import { ITracePath } from '@interfaces';

@injectable()
class TracePath implements ITracePath {
  trace(
    moduleId: any,
    modules: any[],
    currentPath: any[],
    visited: Set<any>,
    circularDependencies: string[]
  ): any[] {
    const module = modules.find((mod) => mod.id === moduleId);
    if (!module) return [];

    if (visited.has(moduleId)) {
      currentPath.unshift('(Circular Dependency)');
      circularDependencies.push(module?.name || module.identifier || '(unknown)');
      return currentPath;
    }

    visited.add(moduleId);

    currentPath.unshift(module?.name || module.identifier || '(unknown)');
    const parentId = module.reasons && module.reasons[0] && module.reasons[0].moduleId;

    if (parentId) {
      return this.trace(parentId, modules, currentPath, visited, circularDependencies);
    } else {
      return currentPath;
    }
  }
}

export { TracePath };
