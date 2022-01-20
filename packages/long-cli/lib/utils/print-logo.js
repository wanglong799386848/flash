"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printLogo = void 0;
const chalk_1 = __importDefault(require("chalk"));
const print_1 = __importDefault(require("./print"));
function printLogo() {
    const { version } = require('../../package.json');
    (0, print_1.default)(chalk_1.default.hex('#FFEA33').bold(`

          ███████╗██╗      █████╗ ███████╗██╗  ██╗       ██████╗██╗     ██╗
          ██╔════╝██║     ██╔══██╗██╔════╝██║  ██║      ██╔════╝██║     ██║
          █████╗  ██║     ███████║███████╗███████║█████╗██║     ██║     ██║
          ██╔══╝  ██║     ██╔══██║╚════██║██╔══██║╚════╝██║     ██║     ██║
          ██║     ███████╗██║  ██║███████║██║  ██║      ╚██████╗███████╗██║
          ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝       ╚═════╝╚══════╝╚═╝                                                                                                                     
                                             
                                                              v${version}
    `));
}
exports.printLogo = printLogo;
