"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractPackages = void 0;
var inversify_1 = require("inversify");
var ExtractPackages = /** @class */ (function () {
    function ExtractPackages() {
    }
    ExtractPackages.prototype.extract = function (modules) {
        var _this = this;
        var packages = new Set();
        modules.forEach(function (module) {
            var name = module === null || module === void 0 ? void 0 : module.name;
            var packageName = _this.getPackageName(name);
            if (packageName) {
                packages.add(packageName);
            }
        });
    };
    ExtractPackages.prototype.getPackageName = function (moduleName) {
        var cleanName = moduleName.split('!').pop();
        if (cleanName === undefined)
            return null;
        var nodeModulesIndex = cleanName.lastIndexOf('node_modules/');
        if (nodeModulesIndex === -1)
            return null;
        var packagePath = cleanName.substring(nodeModulesIndex + 'node_modules/'.length);
        if (packagePath.startsWith('@')) {
            var parts = packagePath.split('/');
            return parts.length > 1 ? "".concat(parts[0], "/").concat(parts[1]) : null;
        }
        else {
            var parts = packagePath.split('/');
            return parts[0];
        }
    };
    ExtractPackages = __decorate([
        (0, inversify_1.injectable)()
    ], ExtractPackages);
    return ExtractPackages;
}());
exports.ExtractPackages = ExtractPackages;
