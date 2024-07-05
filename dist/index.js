"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var container_1 = __importDefault(require("./container"));
var types_1 = require("./types");
function plugin(options) {
    if (options === void 0) { options = {}; }
    if (container_1.default.isBound(types_1.TYPES.Options)) {
        container_1.default.unbind(types_1.TYPES.Options);
    }
    container_1.default.bind(types_1.TYPES.Options).toConstantValue(options);
    return container_1.default.get(types_1.TYPES.BundleVisionPlugin);
}
module.exports = plugin;
