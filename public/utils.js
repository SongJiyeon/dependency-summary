"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var babel = require("@babel/core");
var esprima = require("esprima");
var fs = require("fs");
exports.findModules = function (path) {
    var babelOptions = JSON.parse(fs.readFileSync('.babelrc', 'utf-8'));
    var fileNames = [];
    function findFileNames(folderPath) {
        var fileTypeReg = /\.(js|ts)$/i;
        var wholeFiles = fs.readdirSync(folderPath, { withFileTypes: true });
        var directories = wholeFiles.filter(function (dirent) { return dirent.isDirectory() && dirent.name !== 'node_modules'; });
        var files = wholeFiles
            .filter(function (dirent) { return fileTypeReg.test(dirent.name); })
            .map(function (dirent) { return ({
            'name': dirent.name,
            'path': folderPath + "/" + dirent.name
        }); });
        fileNames = __spreadArrays(fileNames, files);
        if (directories.length) {
            return directories.forEach(function (dir) { return findFileNames(folderPath + "/" + dir.name); });
        }
    }
    findFileNames(path);
    return fileNames.reduce(function (modules, file) {
        var code = babel.transformFileSync(file.path, babelOptions);
        var modulesInFile = code && code.code && esprima.parseModule(code.code).body.filter(function (module) { return module.type === 'ImportDeclaration'; });
        var moduleNames = modulesInFile && modulesInFile.length ?
            modulesInFile.map(function (module) { return module.source.value; }).filter(function (name) { return name[0] !== '.'; }) : [];
        return __spreadArrays(modules, moduleNames);
    }, []);
};
