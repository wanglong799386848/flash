#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const print_1 = __importDefault(require("./utils/print"));
const create_project_1 = __importDefault(require("./bin-list/create-project"));
const print_logo_1 = require("./utils/print-logo");
// 打印logo
(0, print_logo_1.printLogo)();
commander_1.default
    .name('long')
    .usage('[commands] [options]')
    .arguments('<cmd>')
    .action((cmd) => {
    print_1.default.error('long', `无效命令 <${cmd}>...`);
    commander_1.default.help();
});
commander_1.default
    .option('-v, --version', '查看cli版本', () => __awaiter(void 0, void 0, void 0, function* () {
    const { version } = require('../package.json');
    print_1.default.divider();
    (0, print_1.default)('当前版本', version);
    print_1.default.divider();
}));
/**
 * 初始化项目
 */
commander_1.default
    .command('create <projectName>')
    .description('初始化项目')
    .action((projectName) => {
    (0, create_project_1.default)({
        projectName,
    });
});
commander_1.default.command('info', '命令相关信息', { executableFile: './bin', noHelp: true });
commander_1.default.parse(process.argv);
