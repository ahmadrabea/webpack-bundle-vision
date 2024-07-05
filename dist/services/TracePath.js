"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracePath = void 0;
var inversify_1 = require("inversify");
var TracePath = /** @class */ (function () {
    function TracePath() {
    }
    TracePath.prototype.trace = function (moduleId, modules, currentPath, visited, circularDependencies) {
        var module = modules.find(function (mod) { return mod.id === moduleId; });
        if (!module)
            return [];
        if (visited.has(moduleId)) {
            currentPath.unshift('(Circular Dependency)');
            circularDependencies.push((module === null || module === void 0 ? void 0 : module.name) || module.identifier || '(unknown)');
            return currentPath;
        }
        visited.add(moduleId);
        currentPath.unshift((module === null || module === void 0 ? void 0 : module.name) || module.identifier || '(unknown)');
        var parentId = module.reasons && module.reasons[0] && module.reasons[0].moduleId;
        if (parentId) {
            return this.trace(parentId, modules, currentPath, visited, circularDependencies);
        }
        else {
            return currentPath;
        }
    };
    TracePath = __decorate([
        (0, inversify_1.injectable)()
    ], TracePath);
    return TracePath;
}());
exports.TracePath = TracePath;
