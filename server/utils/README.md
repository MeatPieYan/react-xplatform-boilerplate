# 服务端公共文件及方法

## utils.js
#### getServerHost: serverName => serverDomain
获取配置文件中服务器对于环境的域名

##### 传入参数：
1. serverName{string}: 服务器名称
##### 返回参数:
1. serverDomain{string}: 服务器域名

## controller.js
#### sendReq： (domain, path, needWechatInfo = false) => async (ctx, next) => {}

发送一般请求的controller

#### setErrorRes: (ctx, errorMsg, status = 200) => {}
设置服务器错误返回通用方法

##### 传入参数：
1. ctx{object}: koa context
2. errorMsg{string}: 返回给前端的错误信息。
3. status{number}: 返回给前端的http状态码，默认200

##### 返回参数:
无

#### setSuccessRes: (ctx, value) => {}
设置服务器成功返回通用方法

##### 传入参数：
1. ctx{object}: koa context
2. value{object}: 返回给前端的返回值内容。

##### 返回参数:
无

##### 请求参数
1. domain{string}： 请求域名。 例： http://xx.xx.com
2. path{string}: 请求路由。 例：/xxx/xxx
3. needWechatInfo{bool}: 是否需要微信信息。待完善。

##### 返回参数
返回koa路由所需fn。


#### sendCommonGW： (serviceName, method = 'post', serviceVersion = '1.0.0') => async (ctx, next) => {}

发送请求给commonGW的controller

##### 请求参数
1. serviceName{string}： 请求的serviceName。
2. method{string}: 请求方法，默认post。 例：'get' 'post
3. serviceVersion{string}: 请求的server版本号。默认‘1.0.0’。

##### 返回参数
返回koa路由所需fn。


## services.js
#### commonService: async (domain, options) => serviceResult

##### 传入参数
domain{string}: 所需发送请求的域名。
options{object}: 所需发送请求的相关参数。

##### 返回参数
serviceResult{object}: 请求结果
