//接口文档根路径
var baseURL = 'http://ajax.frontend.itheima.net';

//拦截ajax请求
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url;
})