"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundleVisionPlugin = void 0;
var inversify_1 = require("inversify");
var types_1 = require("./types");
var filesize_1 = require("filesize");
var BundleVisionPlugin = /** @class */ (function () {
    function BundleVisionPlugin(options, extractPackages, tracePath, calculateSizes, findDuplicateModules) {
        this.options = options;
        this.numCriticalPaths = 10;
        this.extractPackages = extractPackages;
        this.tracePath = tracePath;
        this.calculateSizes = calculateSizes;
        this.findDuplicateModules = findDuplicateModules;
    }
    BundleVisionPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.done.tapPromise('BuildMetricsPlugin', function (stats) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.outputPath = compiler.options.output.path;
                        return [4 /*yield*/, this.processStats(stats.toJson())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error processing stats:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    BundleVisionPlugin.prototype.processStats = function (stats) {
        return __awaiter(this, void 0, void 0, function () {
            var modules, chunks, time, assets, entrypoints, allPaths, criticalPaths, circularDependencies, modulesPerformance, totalModulesSize, totalAssetsSize, buildTime, assetsCount, chunksCount, entryPointsCount, entryChunks, newTotalAssetsSize, duplicateModules, topCriticalPaths, fs, path, filePath;
            var _this = this;
            return __generator(this, function (_a) {
                modules = stats.modules, chunks = stats.chunks, time = stats.time, assets = stats.assets, entrypoints = stats.entrypoints;
                allPaths = [];
                criticalPaths = [];
                circularDependencies = [];
                modulesPerformance = [];
                totalModulesSize = 0;
                totalAssetsSize = 0;
                buildTime = time;
                assetsCount = assets.length;
                chunksCount = chunks.length;
                entryPointsCount = Object.keys(entrypoints).length;
                // Extract packages from modules
                this.extractPackages.extract(modules);
                entryChunks = chunks.filter(function (chunk) { return chunk.entry; });
                if (entryChunks.length === 0) {
                    console.error('No entry chunks found in webpack stats.');
                    return [2 /*return*/, []];
                }
                entryChunks.forEach(function (entryChunk) {
                    var entryModuleIds = entryChunk.modules.map(function (module) { return module.id; });
                    entryModuleIds.forEach(function (moduleId) {
                        var path = _this.tracePath.trace(moduleId, modules, [], new Set(), circularDependencies);
                        if (path.length > 0) {
                            allPaths.push(path.join(' -> '));
                        }
                    });
                });
                newTotalAssetsSize = this.calculateSizes.calculate(assets, modules, modulesPerformance).totalAssetsSize;
                totalAssetsSize = newTotalAssetsSize;
                totalModulesSize = modulesPerformance.reduce(function (acc, module) { return acc + module.size; }, 0);
                duplicateModules = this.findDuplicateModules.find(modules);
                // Sort paths and select critical paths
                allPaths.sort(function (a, b) { return b.split(' -> ').length - a.split(' -> ').length; });
                criticalPaths = allPaths.slice(0, this.options.criticalPathsLimit || 10);
                topCriticalPaths = criticalPaths.filter(function (path) { return path.split(' -> ').length >= (_this.options.criticalPathDepth || 10); });
                fs = require('fs');
                path = require('path');
                filePath = path.join(this.outputPath, this.options.path || "", this.options.fileName || 'bundle-vision.json');
                if (!fs.existsSync(path.join(this.outputPath, this.options.path || ""))) {
                    fs.mkdirSync(path.join(this.outputPath, this.options.path || ""), { recursive: true });
                }
                fs.writeFileSync(filePath, JSON.stringify({
                    criticalPaths: topCriticalPaths,
                    circularDependencies: circularDependencies,
                    modulesSize: modulesPerformance.map(function (module) { return ({ name: module.name, size: (0, filesize_1.filesize)(module.size) }); }),
                    buildTime: "".concat(buildTime, " ms"),
                    assets: { count: assetsCount, items: assets },
                    chunks: { count: chunksCount, items: chunks },
                    entryPoints: { count: entryPointsCount, items: entrypoints },
                    duplicateModules: { count: duplicateModules.size, items: duplicateModules },
                    totalModulesSize: (0, filesize_1.filesize)(totalModulesSize),
                    totalAssetsSize: (0, filesize_1.filesize)(totalAssetsSize)
                }, null, 2));
                return [2 /*return*/];
            });
        });
    };
    BundleVisionPlugin = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Options)),
        __param(1, (0, inversify_1.inject)(types_1.TYPES.IExtractPackages)),
        __param(2, (0, inversify_1.inject)(types_1.TYPES.ITracePath)),
        __param(3, (0, inversify_1.inject)(types_1.TYPES.ICalculateSizes)),
        __param(4, (0, inversify_1.inject)(types_1.TYPES.IFindDuplicateModules)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], BundleVisionPlugin);
    return BundleVisionPlugin;
}());
exports.BundleVisionPlugin = BundleVisionPlugin;
