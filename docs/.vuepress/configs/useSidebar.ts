const path = require("path");
const dirTree = require("directory-tree");
// 按照 vuepress '分组侧边栏'的规范生成单个配置
// https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%88%86%E7%BB%84
function toSidebarOption(tree = []) {

    if (!Array.isArray(tree)) return [];

    return tree.map((v: any) => {
        if (v.children) {

            return {
                text: v.name,
                collapsible: true, // 可选的, 默认值是 true,
                children: toSidebarOption(v.children),
            };
        } else {
            // 因为所有的md文件必须放到'docs'文件夹下
            // 所以相对路径就是'docs'后面的部分
            // 最后把扩展名去掉, 就是路由的路径
            let path = v.path.split("docs")[1].replace(/\README.md$/, "").replace(/\.md$/, "");
            return path;
            // return [path, path.slice(path.lastIndexOf("/") + 1)];
        }
    });
}



/**
 * 根据 自定义文件夹'docs/src'自动生成vuepress的sidebar选项
 * @param {string} srcPath 自定义文件夹路径,必须在docs文件夹下
 * @returns {object[]}
 */
export const resolveDir = (path: string) => {
    const srcDir = dirTree(path, {
        extensions: /\.md$/,
        normalizePath: true,
    });
    return toSidebarOption(srcDir.children);
}