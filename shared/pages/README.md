# 业务container存放文件夹

### 规范
1. 业务独特代码应存放于业务文件夹， 包括saga, action, reducer。
2. Container不应套用其他Container
3. Container应尽量继承PieComponent, 且用pieConnect连接。
4. 公共的redux相关代码均存放于../redux文件夹下
5. 每个Container必须有pageId，用于发送pv数据。
6. 如果container初始化时需要发送请求，必须实现静态方法loadInitialData。
7. container内部能提取的组件尽量提取组件， 有可能不是整个架构公用的，但是可能是业务内公用的。凡是皆有可能。

### PieComponent提供的功能
static loadInitData(store, rootSaga, action.testAction) => Promise
应该在container的静态方法loadInitialData去调用以完成服务器端初始化请求

### pieConnect提供的功能
1. Component.pageId{string} <必填>: 传入string后， 每次访问该container都会发送一次包含该值的pv请求。
2. Component.pageName{string}: 传入string后， 每次访问该container都会发送一次包含该值的pv请求。
3.  Component.pageTitle{string}: 当访问该container时， 页面的标题会改变成你设置的值。如不设置就不修改当前页面标题，默认使用之前的。

### 文件夹
##### activity
活动相关代码应存放于此文件夹下

##### product
产品相关代码应该存放次文件夹下

##### App.js
所有container的父container
