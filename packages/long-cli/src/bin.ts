#!/usr/bin/env node

import program from 'commander';
import print from './utils/print';

import createProject from './bin-list/create-project';
import { printLogo } from './utils/print-logo';

// 打印logo
printLogo();

program
  .name('long')
  .usage('[commands] [options]')
  .arguments('<cmd>')
  .action((cmd) => {
    print.error('long', `无效命令 <${cmd}>...`);
    program.help();
  });

program
  .option('-v, --version', '查看cli版本', async () => {
    const { version } = require('../package.json');
    print.divider();
    print('当前版本', version);
    print.divider();
  });

/**
 * 初始化项目
 */
program
  .command('create <projectName>')
  .description('初始化项目')
  .action((projectName) => {
    createProject({
      projectName,
    });
  });

program.command('info', '命令相关信息', { executableFile: './bin', noHelp: true });

program.parse(process.argv);
