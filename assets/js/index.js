//入口函数
$(function() {
    // 1.用来获取用户信息
    getUserinfo();
    //4.退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        // 询问框
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function(index) {
            // 清空本地token
            localStorage.removeItem('token');
            // 跳转到登陆页面
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index);
        });
    });
});



//2.封装获取用户信息
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
        },
        //     complete: function(res) {
        //         console.log(res);
        //         console.log('执行了complete 回调');
        //         // 在complete回调函数中, 可以使用responseJSON 拿到服务器反映回来的信息
        //         if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //             // 清空本地token
        //             localStorage.removeItem('token');
        //             // 强制跳转到登录页面
        //             location.href = '/login.html';
        //         }
        //     }
    })
};


// 3.渲染用户头像
function renderAvatar(user) {
    // 1. 用户名
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
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
        $('.user-avatar').show().html(text)
    }
};