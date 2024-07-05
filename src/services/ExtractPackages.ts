import { injectable } from 'inversify';
import { IExtractPackages } from '@interfaces';

@injectable()
class ExtractPackages implements IExtractPackages {
  extract(modules: any[]): void {
    const packages = new Set();

    modules.forEach((module) => {
      const name = module?.name;
      const packageName = this.getPackageName(name);
      if (packageName) {
        packages.add(packageName);
      }
    });
  }

  private getPackageName(moduleName: string): string | null {
    const cleanName = moduleName.split('!').pop();
    if(cleanName === undefined) return null;
    const nodeModulesIndex = cleanName.lastIndexOf('node_modules/');
    if (nodeModulesIndex === -1) return null;

    let packagePath = cleanName.substring(nodeModulesIndex + 'node_modules/'.length);

    if (packagePath.startsWith('@')) {
      const parts = packagePath.split('/');
      return parts.length > 1 ? `${parts[0]}/${parts[1]}` : null;
    } else {
      const parts = packagePath.split('/');
      return parts[0];
    }
  }
}

export { ExtractPackages };
