# vue-admin-template

English | [简体中文](./README-zh.md)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vue-admin-template

**The current version is `v4.0+` build on `vue-cli`. If you want to use the old version , you can switch branch to [tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0), it does not rely on `vue-cli`**

<p align="center">
  <b>SPONSORED BY</b>
</p>
<p align="center">
   <a href="https://finclip.com?from=vue_element" title="FinClip" target="_blank">
      <img height="200px" src="https://gitee.com/panjiachen/gitee-cdn/raw/master/vue%E8%B5%9E%E5%8A%A9.png" title="FinClip">
   </a>
</p>

## Build Setup

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))

## Related Project

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen

### 项目操作步骤

注意点：

- 1.项目文件名不能大写
- 2.老版本 sass 样式里引入需要用 ~@，新版本只需要@

- (1).基础配置

  - 1.使用 scss
  - 2.安装 axios------yarn add axios
  - 2.yarn add element-ui
  - 3.yarn add svg-sprite-loader -D-------使用自己的 svg 图标

    - 新建 src/icons/svg 把 svg 图标放在这里
    - 新建 src/icons/index.js 在这里批量导入 svg 图标
    - 封装 SvgIcon 组件

  - 4.用 normalize.css 保持样式在不同浏览器渲染效果的统一性 yarn add normalize.css
  - 5.用 reset.scss 调整基础样式，放在 styles 文件夹里,在 main.js 里引入

- (2) 配置登录 login 路由--在 app.vue 里放一级路由占位符
- (3) 开始操作登录页面

  - 封装检验规则---在 src/utils/validate.js
  - 为组件加自定义原生事件，必须加 native
  - 二次校验 避免什么都没输入 也能提交点击事件
  - 绑定点击事件 请求登录（配置环境变量）
  - 新建 api/user.js 专门封装关于用户相关的请求 其他请求同理
  - 请求在 actions 里面发送 新建 src/store/modules/user.js 其他请求同理
  - 把 getters actions mutations state 全部模块化拆分出去 最后再 store/index.js 里引入
  - 请求回来的数据放到 vuex state 里面
  - 存储 token 做持久化（可以用 localStorage 也可以用 cookie，为了方便操作 安装插件：js-cookie-----yarn add js-cookie）
  - 解决密码输错也能登录问题
  - 解决没有 token 也鞥访问后续页面的问题 路由前置守卫

  (4) proxy 解决跨域问题

  - 请求是看到的地址是代理前的地址 是发给代理服务器的

  (5) 登录功能

  - 1.解决密码写错也能登录--判断结果是否为 success，如果失败 让他到 catch 里
  - 2.每个接口的返回值都有的 data,success,message，所以以上操作每个请求都要写 可以放到拦截器里面

  (6) 页面路由删改 搭建

  - 在 cmd 里面快速新建文件夹命令--mkdir departments employees setting salarys social attendances approvals permission
