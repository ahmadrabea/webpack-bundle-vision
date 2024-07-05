import { injectable } from 'inversify';
import { IFindDuplicateModules } from '@interfaces';

@injectable()
class FindDuplicateModules implements IFindDuplicateModules {
  find(modules: any[]): Set<any> {
    const seen = new Set();
    const duplicates = new Set();

    modules.forEach((module) => {
      const id = (module.id && module.id.trim() )|| module.identifier;

      if (seen.has(id)) {
        duplicates.add(id);

      } else {
        seen.add(id);
      }
    });

    return duplicates;
  }
}

export { FindDuplicateModules };
