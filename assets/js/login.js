// 入口函数
$(function() {
    // 1.点击注册区域 隐藏登录区域
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 2.点击登录区域 隐藏注册区域
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    });

    // 3. 校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 4. 确认密码校验规则
        repwd: function(value) {
            var pwd = $('.reg-box input[name=password]').val();
            if (value != pwd) {
                return '两次密码不一样！'
            }
        }
    });

    // 4. 注册功能
    $('#form-reg').on('submit', function(e) {
        //4.1 阻止默认提交
        e.preventDefault();
        //4.2 发送ajax
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: function(res) {
                // 4.3 判断
                if (res.status !== 0) {
                    return console.log(res.message);
                }
                console.log(res.message);
            }
        })

    })
})