# 项目开发规范
本文档为御温泉中后台开发规范。

# 命名规范
为了让大家书写可维护的代码，而不是一次性的代码

让团队当中其他人看你的代码能一目了然

## 普通变量命名规范

命名方法 ：驼峰命名法

命名规范 ：

命名必须是跟需求的内容相关的词，比如说我想申明一个变量，用来表示我的学校，那么我们可以这样定义const mySchool = "我的学校";


命名是复数的时候需要加s,比如说我想申明一个数组，表示很多人的名字，那么我们可以这样定义const names = new Array();

## 常量 

命名方法 : 全部大写
命名规范 : 使用大写字母和下划线来组合命名，下划线用以分割单词。
const MAX_COUNT = 10
const URL = 'https://www.baidu.com/'

## 组件命名规范

PascalCase (单词首字母大写命名)是最通用的声明约定

kebab-case (短横线分隔命名) 是最通用的使用约定


# 结构化规范
## 目录文件夹及子文件规范
```
src                               源码目录
|-- main                             项目入口
|-- constant                         全局常量
|-- permission                       router钩子设置，用于权限控制
|-- api                              接口，统一管理
|-- assets                           静态资源，统一管理
|-- components                       公用组件，全局文件
|-- filters                          过滤器，全局工具
|-- mock                             模拟接口，临时存放
|-- router                           路由，统一管理
|-- store                            vuex, 统一管理
|-- views                         视图目录
|   |-- good                        视图一级模块文件夹
|   |   |-- addGood                     视图一级模块页面级组件文件夹
|   |   |   |-- AddGood.vue                 模块入口页面
|   |   |   |-- components                  页面级组件文件夹
|   |   |   |-- mixin.js                    Vuex混入文件               
```

## vue 文件基本结构
```
  <template>
    <div>
      <!--必须在div中编写页面-->
    </div>
  </template>
  <script>
    export default {
      components : {
      },
      data () {
        return {
        }
      },
      mounted() {
      }，
      methods: {
      }
   }
  </script>
  <!--声明语言，并且添加scoped-->
  <style lang="*" scoped>
  </style>
```
## 组件选项顺序
```
  - components
  - props
  - data
  - computed
  - created
  - mounted
  - metods
  - filter
  - watch

```