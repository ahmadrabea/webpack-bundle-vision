import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { IExtractPackages, ITracePath, ICalculateSizes, IFindDuplicateModules, IBundleVisionPlugin } from '@interfaces';
import { ExtractPackages, TracePath, CalculateSizes, FindDuplicateModules } from '@services';
import { BundleVisionPlugin } from './BundleVisionPlugin';
const container = new Container();

container.bind<IExtractPackages>(TYPES.IExtractPackages).to(ExtractPackages);
container.bind<ITracePath>(TYPES.ITracePath).to(TracePath);
container.bind<ICalculateSizes>(TYPES.ICalculateSizes).to(CalculateSizes);
container.bind<IFindDuplicateModules>(TYPES.IFindDuplicateModules).to(FindDuplicateModules);
container.bind<BundleVisionPlugin>(TYPES.BundleVisionPlugin).to(BundleVisionPlugin);



export default container ;
