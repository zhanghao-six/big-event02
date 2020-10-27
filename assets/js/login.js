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
    var layer = layui.layer;
    $('#form-reg').on('submit', function(e) {
        //4.1 阻止默认提交
        e.preventDefault();
        //4.2 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: function(res) {
                // 4.3 判断
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message)
                }
                // console.log(res.message);
                layer.msg('注册成功,请登录！');
                // 跳转到登录页面
                $('#link_login').click();
                // 清除注册表单数据
                $('#form-reg')[0].reset();
            }
        })

    });

    // 5. 登录功能
    $('#form-login').submit(function(e) {
        // 5.1 阻止默认跳转
        e.preventDefault();
        // console.log(11);
        // 5.2 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(), // serialize() 快速获取表单数据
            success: function(res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // console.log(11);
                layer.msg('恭喜你,登录成功！');
                // 保存 token  访问有密钥的网页
                localStorage.setItem('token', res.token);
                // 跳转到主页
                location.href = '/index.html';
            }
        })
    })
})