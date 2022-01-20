/**
 * 创建项目的配置项
 */
interface ProjectOptions {
    projectName: string;
}
export default function ({ projectName, }: ProjectOptions): Promise<void>;
export {};
