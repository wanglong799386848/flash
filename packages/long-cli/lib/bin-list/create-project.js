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
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const ora_1 = __importDefault(require("ora"));
const utils_1 = require("../utils");
const spinner = (0, ora_1.default)();
function default_1({ projectName, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!projectName) {
            utils_1.print.error('缺少项目名');
            process.exit(0);
        }
        // 构建项目的目标路径
        const targetDir = path_1.default.resolve(projectName);
        // 用户选择是否覆盖项目，不覆盖则退出cli
        if (!(yield (0, utils_1.confirm)(() => fs_extra_1.default.existsSync(targetDir), `当前目录下存在 ${projectName} 文件夹，是否覆盖？`))) {
            process.exit(0);
        }
        fs_extra_1.default.emptyDirSync(targetDir);
        process.chdir(targetDir); // 切换到目标目录下
        spinner.start('获取远程模板中...');
        // 执行npm 命令，安装依赖包
        fs_extra_1.default.writeFileSync('package.json', JSON.stringify({
            name: projectName,
        }));
        yield new Promise((resolve, reject) => {
            (0, cross_spawn_1.default)('npm', ['install', 'flash-template-test-vant', '--registry=https://registry.flashexpress.pub/repository/npm-all/'])
                .on('close', (code) => {
                if (code === 0) {
                    spinner.succeed('获取远程模板成功');
                    resolve(null);
                }
                else {
                    spinner.fail('获取项目模板异常，请检查网络情况');
                    reject(0);
                    process.exit(0);
                }
            });
        });
        // 复制模板文件
        yield fs_extra_1.default.copy(path_1.default.resolve(targetDir, './node_modules/flash-template-test-vant/template'), targetDir);
        // 初始化依赖
        spinner.start('安装项目依赖中...');
        yield new Promise((resolve, reject) => {
            (0, cross_spawn_1.default)('npm', ['install', '--registry=https://registry.flashexpress.pub/repository/npm-all/'])
                .on('close', (code) => {
                if (code === 0) {
                    spinner.succeed('项目依赖安装成功');
                    resolve(null);
                }
                else {
                    spinner.fail('项目依赖安装失败，您可以手动进行安装');
                    reject();
                }
            });
        });
    });
}
exports.default = default_1;
