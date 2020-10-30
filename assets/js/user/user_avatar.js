 $(function() {
     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
         // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     // 1.3 创建裁剪区域
     $image.cropper(options);


     // 1.4 选择文件
     $('.btnChoose').on('click', function() {
         $('#file').click();
     });


     // 1.5 修改裁剪图片
     var layer = layui.layer;
     $('#file').on('click', function(e) {
         // 拿到用户选择的图片
         var file = e.target.files[0];
         //  console.log(files);
         if (file == undefined) {
             return layer.msg('请选择图片！')
         }
         // 有图片 根据选择的文件 创建一个对应的URL地址
         var newImgURL = URL.createObjectURL(file)
             //先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
         $image
             .cropper('destroy') // 销毁旧的裁剪区域
             .attr('src', newImgURL) // 重新设置图片路径
             .cropper(options) // 重新初始化裁剪区域
             //  将裁剪后的图片， 输出为 base64 格式的字符串
     });


     // 1.6 上传头像
     $('#btnUpload').on('click', function() {
         //  alert(11)
         //  将裁剪后的图片，输出为 base64 格式的字符串
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
             //  console.log(dataURL);
             // 发送ajax
         $.ajax({
             method: 'POST',
             url: '/my/update/avatar',
             data: {
                 avatar: dataURL
             },
             success: function(res) {
                 //  console.log(res);
                 if (res.status != 0) {
                     return layer.msg(res.message)
                 }
                 // 渲染头像
                 layer.msg('更换成功！');
                 window.parent.getUserinfo();
             }
         })

     })

 })