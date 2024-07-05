"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateSizes = void 0;
var inversify_1 = require("inversify");
var CalculateSizes = /** @class */ (function () {
    function CalculateSizes() {
    }
    CalculateSizes.prototype.calculate = function (assets, modules, modulesPerformance) {
        var totalAssetsSize = 0;
        assets.forEach(function (asset) {
            totalAssetsSize += asset.size;
        });
        modules.forEach(function (module) {
            var moduleName = (module === null || module === void 0 ? void 0 : module.name) || module.identifier || '(unknown)';
            var moduleSize = module.size;
            modulesPerformance.push({
                name: moduleName,
                size: moduleSize,
            });
        });
        return { totalAssetsSize: totalAssetsSize };
    };
    CalculateSizes = __decorate([
        (0, inversify_1.injectable)()
    ], CalculateSizes);
    return CalculateSizes;
}());
exports.CalculateSizes = CalculateSizes;
