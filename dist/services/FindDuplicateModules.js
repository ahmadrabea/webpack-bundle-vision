"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindDuplicateModules = void 0;
var inversify_1 = require("inversify");
var FindDuplicateModules = /** @class */ (function () {
    function FindDuplicateModules() {
    }
    FindDuplicateModules.prototype.find = function (modules) {
        var seen = new Set();
        var duplicates = new Set();
        modules.forEach(function (module) {
            var id = (module.id && module.id.trim()) || module.identifier;
            if (seen.has(id)) {
                duplicates.add(id);
            }
            else {
                seen.add(id);
            }
        });
        return duplicates;
    };
    FindDuplicateModules = __decorate([
        (0, inversify_1.injectable)()
    ], FindDuplicateModules);
    return FindDuplicateModules;
}());
exports.FindDuplicateModules = FindDuplicateModules;
