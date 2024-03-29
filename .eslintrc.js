module.exports = {
  root: true,
  extends: "vuepress",
  globals: {
    __VUEPRESS_VERSION__: "readonly",
    __VUEPRESS_DEV__: "readonly",
    __VUEPRESS_SSR__: "readonly",
    __VUE_HMR_RUNTIME__: "readonly",
    __VUE_OPTIONS_API__: "readonly",
    __VUE_PROD_DEVTOOLS__: "readonly",
  },
  // overrides: [
  //   {
  //     files: ["*.ts", "*.vue"],
  //     extends: "vuepress-typescript",
  //     parserOptions: {
  //       project: ["tsconfig.json"],
  //     },
  //     rules: {
  //       "@typescript-eslint/ban-ts-comment": "off",
  //       "@typescript-eslint/no-explicit-any": "off",
  //       "@typescript-eslint/no-non-null-assertion": "off",
  //       "@typescript-eslint/no-var-requires": "off",
  //       "vue/component-tags-order": [
  //         "error",
  //         {
  //           order: ["script", "template", "style"],
  //         },
  //       ],
  //       "vue/multi-word-component-names": "off",
  //     },
  //   },
  //   {
  //     files: ["*.vue"],
  //     globals: {
  //       defineEmits: "readonly",
  //       defineProps: "readonly",
  //     },
  //     rules: {
  //       // disable for setup script
  //       "@typescript-eslint/no-unused-vars": "off",
  //     },
  //   },
  //   {
  //     files: ["**/client/config.ts"],
  //     rules: {
  //       "vue/match-component-file-name": "off",
  //     },
  //   },
  //   {
  //     files: ["**/__tests__/**/*.ts"],
  //     env: {
  //       jest: true,
  //     },
  //     rules: {
  //       "@typescript-eslint/explicit-function-return-type": "off",
  //       "vue/one-component-per-file": "off",
  //       "import/no-extraneous-dependencies": [
  //         "error",
  //         {
  //           devDependencies: true,
  //           optionalDependencies: false,
  //           peerDependencies: false,
  //         },
  //       ],
  //     },
  //   },
  // ],
  rules: {
    indent: ['error', "tab"], //使用tab缩进
    "linebreak-style": ["error", "off"], //不检测换行样式
    quotes: ["error", "single"], //单引号
    semi: ["error", "always"], //始终需要分号
    "vue/no-multiple-template-root": "off", //vue是否允许有多个根template
  },
};
