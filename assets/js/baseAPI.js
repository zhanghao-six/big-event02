//接口文档根路径
var baseURL = 'http://ajax.frontend.itheima.net';

//1.拦截ajax请求
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url;


    //2.对有权限的接口配置头信息
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    //3. 拦截所有响应 判断身份认证信息
    params.complete = function(res) {
        // console.log(res.responseJSON);
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 清空token值
            localStorage.removeItem('token');
            // 强制跳转登录页面
            location.href = '/login.html';
        }
    }
});