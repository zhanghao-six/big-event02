$(function() {
    initArtCateList();


    // 1. 封装获取文章分类列表
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                var str = template('tpl-art-cate', res);
                $('tbody').html(str)
            }
        })
    };

    // 2. 给添加类别出现展示框
    var layer = layui.layer;
    $('#btnAdd').on('click', function() {
        // alert(11)
        indexAdd = layer.open({
            type: 1,
            title: '添加类别分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html()
        });
    })

    // 3. 提交文章分类添加(事件委托)
    var indexAdd = null;
    $('body').on('submit', '#from-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 添加成功
                initArtCateList()
                layer.msg('添加成功！')
                layer.close(indexAdd)
            }
        })
    });


    // 4. 修改 展示
    var indexEdit = null;
    // form
    // layer
    var form = layui.form;
    $('body').on('click', '.btn-edit', function(e) {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html()
        });
        var Id = $(this).attr('data-id')
            // console.log(Id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function(res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    });

    // 修改 提交
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 修改成功
                initArtCateList();
                layer.msg('修改成功！')
                layer.close(indexEdit);
            }
        })
    });


    // 删除
    $('tbody').on('click', '.btn-delete', function() {
        // alert(11)
        var Id = $(this).attr('data-id');
        // console.log(Id);
        // 显示对话框
        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                success: function(res) {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg('删除成功！')
                    layer.close(index);
                }
            })
        });
    })
})