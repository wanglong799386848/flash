import fs from 'fs-extra';
import path from 'path';
import crossSpawn from 'cross-spawn';
import ora from 'ora';
import { print, confirm } from '../utils';

const spinner = ora();

/**
 * 创建项目的配置项
 */
interface ProjectOptions {
  projectName: string
}

export default async function ({
  projectName,
}: ProjectOptions) {
  if (!projectName) {
    print.error('缺少项目名');
    process.exit(0);
  }

  // 构建项目的目标路径
  const targetDir = path.resolve(projectName);

  // 用户选择是否覆盖项目，不覆盖则退出cli
  if (
    !(await confirm(
      () => fs.existsSync(targetDir),
      `当前目录下存在 ${projectName} 文件夹，是否覆盖？`,
    ))
  ) {
    process.exit(0);
  }

  fs.emptyDirSync(targetDir);
  process.chdir(targetDir); // 切换到目标目录下

  spinner.start('获取远程模板中...');
  // 执行npm 命令，安装依赖包
  fs.writeFileSync('package.json', JSON.stringify({
    name: projectName,
  }));

  await new Promise((resolve, reject) => {
    crossSpawn('npm', ['install', 'flash-template-test-vant', '--registry=https://registry.flashexpress.pub/repository/npm-all/'])
      .on('close', (code) => {
        if (code === 0) {
          spinner.succeed('获取远程模板成功');
          resolve(null);
        } else {
          spinner.fail('获取项目模板异常，请检查网络情况');
          reject(0);
          process.exit(0);
        }
      });
  });

  // 复制模板文件
  await fs.copy(path.resolve(targetDir, './node_modules/flash-template-test-vant/template'), targetDir);

  // 初始化依赖
  spinner.start('安装项目依赖中...');
  await new Promise((resolve, reject) => {
    crossSpawn('npm', ['install', '--registry=https://registry.flashexpress.pub/repository/npm-all/'])
      .on('close', (code) => {
        if (code === 0) {
          spinner.succeed('项目依赖安装成功');
          resolve(null);
        } else {
          spinner.fail('项目依赖安装失败，您可以手动进行安装');
          reject();
        }
      });
  });
}
