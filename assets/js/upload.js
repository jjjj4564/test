$(document).ready(function(){
    $('#fileupload').fileupload({
        dropZone: $('#drop'), //拖曳上傳區域
        url: 'testUpload.php',  //上傳處理的PHP
        dataType: 'json',

        //將要上傳的資料顯示
        add: function (e, data) {
            var tpl = $('<div class="working"><span class="pro" /><span class="info"></span><span class="ctrl">取消</span></div>');
            tpl.find('.info').text(data.files[0].name);
            data.context = tpl.appendTo($(".item"));

            tpl.find('.ctrl').click(function(){
                //if(tpl.hasClass('working')){
                //    jqXHR.abort();  //取消上傳
                //}

                tpl.fadeOut(function(){
                    tpl.remove();
                });
            });
            //執行 data.submit() 開始上傳
            $("#start").click(function() {
                var jqXHR = data.submit();
            });
        },

        //單一檔案進度
        progress: function(e, data){
            var progress = parseInt(data.loaded / data.total * 100, 10);
            data.context.find('.pro').text(progress+"%　　").change();
            if(progress == 100){
                data.context.removeClass('working');
            }
        },

        //整體進度
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css('width', progress + '%');
            $('#progress .bar').text(progress + '%');
        },

        //上傳失敗
        fail:function(e, data){
            data.context.addClass('error');
        },

        //單一檔案上傳完成
        done: function (e, data) {
            var tmp = data.context.find('.pro').text();
            data.context.find('.pro').text(tmp + data.result.status + "　　");
        },

        //全部上傳完畢
        stop: function (e) {
            alert("上傳完畢");
        }
    });

    //拖曳成功讓框變色
    $("#drop").bind({
        dragenter: function() {
            $(this).addClass("active");
        },
        dragleave: function() {
            $(this).removeClass("active");
        }
    });
});