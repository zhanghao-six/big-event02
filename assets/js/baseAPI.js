//接口文档根路径
var baseURL = 'http://ajax.frontend.itheima.net';

//拦截ajax请求
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url;


    // 对有权限的接口配置头信息
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
});