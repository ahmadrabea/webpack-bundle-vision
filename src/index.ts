import 'reflect-metadata';
import  container  from './container';
import { TYPES } from './types';
import { IBundleVisionPlugin, Options } from '@interfaces';
import { BundleVisionPlugin } from './BundleVisionPlugin';

function plugin(options:Options = {}): BundleVisionPlugin{

    if (container.isBound(TYPES.Options)) {
        container.unbind(TYPES.Options);
    }
    container.bind(TYPES.Options).toConstantValue(options);
    return container.get<IBundleVisionPlugin>(TYPES.BundleVisionPlugin) as BundleVisionPlugin;
}


module.exports = plugin;