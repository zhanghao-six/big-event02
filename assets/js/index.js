//入口函数
$(function() {
    // 用来获取用户信息
    getUserinfo();
});


//封装获取用户信息
function getUserinfo() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            // 判断状态码
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染头像
            renderAvatar(res.data);
        }
    })
};


// 渲染用户头像
function renderAvatar(user) {
    // 1. 用户名
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;nbsp;' + name);
    // 2. 用户头像
    if (user.user_pic !== null) {
        //2.1 有头像 隐藏文字头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-avatar').hide();
    } else {
        // 2.2 没有头像 显示文字头像
        $('.layui-nav-img').hide();
        // 文字第一个大写
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text);
    }
}