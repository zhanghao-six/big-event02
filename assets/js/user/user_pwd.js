 // 入口函数
 $(function() {
     // 1. 自定义校验规则
     var form = layui.form;
     form.verify({
         //  密码不能
         pwd: [
             /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
         ],
         // 新旧不重复
         samePwd: function(value) {
             if (value == $('[name=oldPwd]').val()) {
                 return '原密码不能和新密码一样！'
             }
         },
         // 两次新密码必须一样
         rePwd: function(value) {
             if (value != $('[name=newPwd]').val()) {
                 return '两次新密码不一致！'
             }
         }
     });


     // 2. 表单提交
     $('.layui-form').on('submit', function(e) {
         // 2.1 阻止默认跳转
         e.preventDefault();
         // 2.2 发送ajax
         $.ajax({
             method: 'POST',
             url: '/my/updatepwd',
             data: $(this).serialize(),
             success: function(res) {
                 //  console.log(res);
                 if (res.status != 0) {
                     return layui.layer.msg(res.message)
                 }
                 layui.layer.msg('修改密码成功！')
                     // 清空表单数据
                 $('.layui-form')[0].reset();
             }
         })

     })
 });