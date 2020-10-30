var form = layui.form;
$(function() {
    // 1.自定义校验规则

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度为1 ~ 6位之间！'
            }
        }
    })
});

// 2. 用户渲染
initUserInfo();
// var layer = layui.layer;
// 封装函数
function initUserInfo() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // console.log(res);
            // 成功 渲染
            // form.val() 可以快速为表单赋值  是layui里面的
            form.val('formUserInfo', res.data)
        }

    })
}

// 3. 表单重置
$('#btnReset').on('click', function(e) {
    e.preventDefault();
    // alert(11)
    // 重新渲染
    initUserInfo()
});

// 4. 修改用户信息
$('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            // 更新成功
            layer.msg('恭喜你,更新成功！')
            window.parent.getUserinfo();
        }
    })

})