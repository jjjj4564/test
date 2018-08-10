var fake_loading = 0;

var window_alert_data = [];
var block_important_data = [];
var user_data = [];
var post_data = [];
var contact_data = [];
var output_user_data = [];


var initime = new Date().getTime();


var edit_form_list = [];


var $api_url = '';
if(location.host.indexOf('8888') > 0){
    $api_url = '/planxcape';
}


String.prototype._indexOf = String.prototype.indexOf;
String.prototype.indexOf = function()
{
    if(typeof(arguments[arguments.length - 1]) != 'boolean')
        return this._indexOf.apply(this,arguments);
    else
    {
        var bi = arguments[arguments.length - 1];
        var thisObj = this;
        var idx = 0;
        if(typeof(arguments[arguments.length - 2]) == 'number')
        {
            idx = arguments[arguments.length - 2];
            thisObj = this.substr(idx);
        }
        var re = new RegExp(arguments[0],bi?'i':'');
        var r = thisObj.match(re);
        return r==null?-1:r.index + idx;
    }
};

function zat_log(text,type) {
    var now = moment(new Date()).format("HH:mm:ss");
    var $print_attr = '';

    if($("#zat_log table tr:last-child td:eq(1)").text() == text){
        $("#zat_log table tr:last-child").attr('class','index');
        $("#zat_log table tr:last-child").attr('data-index',1 + parseInt($("#zat_log table tr:last-child").attr('data-index')));
    }else{
        $("#zat_log table").append("<tr data-index='0'><td>&lt;"+type+"&gt;</td><td>"+text+"</td><td>&nbsp;&nbsp;"+now+"</td></td>");
    }

    setTimeout(function () {
        $("#zat_log").scrollTop($("#zat_log").height());
    },100);
}

//Vue 動態時報
$( function() {
    if($("#block-post").length > 0){
        var vm = new Vue({
            el: '#block-post',
            data: {
                items: post_data
            },
            mounted: function() {
                $.ajax({ url: $api_url+"/assets/json/post_data.json", dataType: "json",
                    success: function(data){
                        setTimeout(function () {
                            $.each(data, function (i) {

                                //加入一個值
                                data[i]['load_more_seen'] = false;

                                post_data.push(data[i])

                            });
                            //$(".alert-list").removeClass('hide');
                        },0);
                    }.bind(this),
                    error: function(data){
                        console.log("json post_data error!");
                    }
                });
            },
            methods: {

                //頂部文字
                fullmsg: function(index) {
                    var $self = this.items[index];
                    var $task_msg = '';
                    var $permissions = '';
                    var $meta = '';

                    if($self.task_state == "創建" && $self.task == "會議"){
                        $task_msg = "創建了一個新的會議"
                    }
                    if($self.task_state == "新增" && $self.task == "確認事項"){
                        $task_msg = "新增了一個確認事項"
                    }

                    return "<a href='"+$self.author_link+"' class='name'>"+$self.author_name+"</a> <span class='msg'>"+$task_msg+" <a href='"+$self.task_link+"'>"+$self.task_name+"</a></span>";

                },
                //時間
                meta: function (index) {
                    var $self = this.items[index];
                    var $post_meta_parse = Date.parse($self.post_meta);


                    return format_meta($post_meta_parse);
                },
                //權限
                permissions: function (index) {
                    var $self = this.items[index];
                    var $icon = '';

                    if($self.post_permissions == "公開"){
                        $icon="p-public";
                    }
                    if($self.post_permissions == "全專案成員"){
                        $icon="p-all-project";
                    }
                    if($self.post_permissions == "內部成員"){
                        $icon="p-inside";
                    }
                    if($self.post_permissions == "指定成員"){
                        $icon="p-specified-list";
                    }
                    if($self.post_permissions == "排除成員"){
                        $icon="p-black-list";
                    }
                    if($self.post_permissions == "僅限自己"){
                        $icon="p-self";
                    }

                    return $icon;
                },
                //貼文class
                type_Class: function (index) {
                    var $self = this.items[index];
                    var $class = '';

                    if($self.task == "會議"){
                        $class = "metting"
                    }
                    if($self.task == "確認事項"){
                        $class = "confirm"
                    }


                    return $class;
                },
                //googleMap 網址
                map: function (index) {
                    var $self = this.items[index];
                    var $url = "https://www.google.com.tw/maps/place/"+$self.post_data[0].metting_address;

                    return $url;
                },
                //看更多
                load_more: function (index) {
                    var $self = this.items[index];

                    $self.load_more_seen=!$self.load_more_seen;
                },
                //參與人員＋＋
                meeter_more_title: function (index) {
                    var $self = this.items[index].post_data[0].metting_meeter;
                    var $title = "";

                    $.each($self,function (i) {

                       if(i >= 3){
                           $title += $self[i].name;

                           if(i < $self.length-1){
                               $title += '\n';
                           }
                       }

                    });

                    return $title;
                },
                //留言時間
                reply_meta: function (index,index2) {
                    var $self = this.items[index];
                    var $post_meta_parse = Date.parse($self.post_reply[index2].reply_meta);


                    return format_meta($post_meta_parse);
                }

            }
        })
    }

});

//Vue 動態通知
$( function() {
    initime = new Date().getTime();

    if($("#window-alert").length > 0){
        var vm = new Vue({
            el: '#window-alert',
            data: {
                items: window_alert_data
            },
            mounted: function() {
                $.ajax({ url: $api_url+"/assets/json/window_alert_data.json", dataType: "json",
                    success: function(data){
                        setTimeout(function () {
                            zat_log("(動態通知)" + (new Date().getTime() - initime) + "ms",'ajax')

                            $.each(data, function (i) {
                                window_alert_data.push(data[i])
                            });
                            $(".alert-list").removeClass('hide');
                        },fake_loading);
                    }.bind(this),
                    error: function(data){
                        console.log("json window_alert_data error!");
                    }
                });
            }
        })
    }

});


//Vue 重要專案
$( function() {
    initime = new Date().getTime();

    if($("#block-important").length > 0){
        var vm = new Vue({
            el: '#block-important',
            data: {
                items: block_important_data
            },
            mounted: function() {
                $.ajax({ url: $api_url+"/assets/json/block_important_data.json", dataType: "json",
                    success: function(data){
                        setTimeout(function () {
                            zat_log("(重要專案)" + (new Date().getTime() - initime) + "ms",'ajax')

                            $.each(data,function (i) {
                                block_important_data.push(data[i]);
                            });

                            $(".block-important-list").removeClass('hide');
                            $(".block-important-loader").addClass('hide');


                            var $container = $("#block-important .block-container");

                            if(block_important_data.length < $container.attr('data-min')){
                                $container.attr('data-min',block_important_data.length)
                            }else{
                                $("#block-important .block-more").removeClass('hide');
                            }

                            $container.css({height: (50 * $container.attr('data-min')) + 'px',minHeight: (50 * $container.attr('data-min')) + 'px'});

                            setTimeout(function () {
                                meun_scroll();
                            },50)
                        },fake_loading)
                    }.bind(this),
                    error: function(data){
                        console.log("json block_important_data error!");
                    }
                });
            }
        });
    };
});

//Vue 成員標籤
$( function() {
    if($("#block-add-post").length > 0){
        var vm = new Vue({
            el: '#block-add-post',
            data: {
                items: output_user_data
            },
            mounted: function() {
                $.ajax({ url: $api_url+"/assets/json/user_data.json", dataType: "json",
                    success: function(data){
                        $.each(data,function (i) {
                            user_data.push(data[i]);
                        });
                    }.bind(this),
                    error: function(data){
                        console.log("json user_data error!");
                    }
                });
            },
            methods: {
                click: function(id,name){
                    $.each(output_user_data,function (i) {
                        if(output_user_data[i].id == id){
                            edit_form_list.push(output_user_data[i]);
                        }
                    });

                    output_user_data.length = 0;
                    output_user_data.sort();

                    $(".metting-meeter-list .new-tag").before('<li class="tags">'+name+'<i class="p-icon p-close"></i></li>');
                    $(".metting-meeter").val('')
                },
                mouseover: function(index) {
                    $(".metting-meeter-list .meeter-tip-list .meeter-tip-item").removeClass('active');
                    $(".metting-meeter-list .meeter-tip-list .meeter-tip-item").eq(index).addClass('active');
                },
                firstClass: function(index) {
                    if(index == 0){
                        return 'active';
                    }
                }
            }
        });
    }
});


//Vue 聯絡人
$( function() {
    initime = new Date().getTime();

    if($("#block-contact").length > 0){
        var vm = new Vue({
            el: '#block-contact',
            data: {
                items: contact_data
            },
            mounted: function() {
                $.ajax({ url: $api_url+"/assets/json/contact_data.json", dataType: "json",
                    success: function(data){
                        setTimeout(function () {
                            zat_log("(聯絡人)" + (new Date().getTime() - initime) + "ms",'ajax')

                            $.each(data, function (i) {
                                contact_data.push(data[i]);
                            });

                            $(".block-contact-list").removeClass('hide');
                            $("#block-contact .block-more").removeClass('hide');
                            $(".block-contact-loader").addClass('hide');

                        },fake_loading);
                    }.bind(this),
                    error: function(data){
                        console.log("json contact_data error!");
                    }
                });
            }
        });
    };
});


$( function() {
    init()
});


function init() {
    init_check_cookie();
}

function init_check_cookie() {

    //同步寄出通知
    if (localStorage.getItem("post-alert-toggle") != null) {
        var $val = localStorage.getItem("post-alert-toggle");

        $("#post-alert-toggle").prop("checked",stringToBoolean($val));

    }

    //同步寄出電子郵件
    if (localStorage.getItem("post-email-toggle") != null) {
        var $val = localStorage.getItem("post-email-toggle");

        $("#post-email-toggle").prop("checked",stringToBoolean($val));

    }
}

function stringToBoolean(val) {
    switch(val.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(val);
    }
}

//格式化時間
function format_meta(time) {
    //現在時間
    var $now_parse = Date.parse(new Date());

    //po文時間
    var $post_meta_parse = time;


    var $meta_distance = $now_parse - $post_meta_parse;
    var $meta_distance_minute = $meta_distance / 1000 / 60;
    var $meta_distance_hour = $meta_distance_minute / 60;
    var $meta_distance_date = $meta_distance_hour / 24;
    var $meta = $meta_distance;

    if($meta_distance_minute < 60){
        $meta = Math.round($meta_distance_minute) + " 分鐘"
    }else if($meta_distance_hour < 24){
        $meta = Math.round($meta_distance_hour) + " 小時"
    }else {
        $meta = moment($post_meta_parse).format("YYYY年MM月DD日 HH:mm");
    }

    return $meta;
}


$(function() {
    function h(e) {

        if($(e).attr('data-height') != e.scrollHeight){
            $(e).attr({'data-height': e.scrollHeight});
            $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
        }

    }
    $('textarea').each(function () {
        h(this);
    }).on('input', function () {
        h(this);
    });
});


//引入日期選擇套件
$(function () {
    var $locale = 'zh-tw';

    //會議－會議日期
    $("#block-add-post .metting-date").datetimepicker({
        locale: $locale,
        format: 'YYYY年MM月DD日 (ddd)'
    }).on("dp.show", function (date) {
        //var $aa = $(".bootstrap-datetimepicker-widget").clone()
        //$("#main").append($aa)
    });

    //會議－會議時間
    $("#block-add-post .metting-time").datetimepicker({
        locale: $locale,
        format: 'h點m分 (A)'
    }).on("dp.show", function (date) {
        //var $aa = $(".bootstrap-datetimepicker-widget").clone()
        //$("#main").append($aa)
    });

    $("#datetimepicker12").datetimepicker({
        locale: $locale,
        inline: true,
        format: 'YYYY/MM/DD'
    });


    //里程碑－起始日期
    $("#block-add-post .milestone-start-date").datetimepicker({
        locale: $locale,
        format: 'YYYY年MM月DD日 (ddd)'
    }).on("dp.show", function (date) {
        //var $aa = $(".bootstrap-datetimepicker-widget").clone()
        //$("#main").append($aa)
    });

    //里程碑－結束日期
    $("#block-add-post .milestone-end-date").datetimepicker({
        locale: $locale,
        format: 'YYYY年MM月DD日 (ddd)'
    }).on("dp.show", function (date) {
        //var $aa = $(".bootstrap-datetimepicker-widget").clone()
        //$("#main").append($aa)
    });

    //工作事項－日期
    $("#block-add-post .confirm-date").datetimepicker({
        locale: $locale,
        format: 'YYYY年MM月DD日 (ddd)'
    }).on("dp.show", function (date) {
        //var $aa = $(".bootstrap-datetimepicker-widget").clone()
        //$("#main").append($aa)
    });

    //工作事項－時間
    $("#block-add-post .confirm-time").datetimepicker({
        locale: $locale,
        format: 'h點m分 (A)'
    }).on("dp.show", function (date) {
        //var $aa = $(".bootstrap-datetimepicker-widget").clone()
        //$("#main").append($aa)
    });

});
$(function () {
    $(".picker-switch").on('click',function (event) {
        if($(this).text().indexOf('月') <= 0){
            $(".picker-switch").attr('style','pointer-events: none;');
        }
    });

    $(".bootstrap-datetimepicker-widget tbody").on('click',function (event) {
        $(".picker-switch").attr('style','pointer-events: auto;');
    });

});


$(function() {
    var open_class = 'open-post';


    $("#block-add-post").on('click',function () {
        if($("#main").hasClass(open_class) == false){
            $("#block-add-post .message .textarea").focus();
        }
        $("#main").addClass(open_class)
    });

    $( "html,body" ).click(function( event ) {
        var $window = $(event.target).closest('#block-add-post').length;
        if( $window == 0){
            if($( "body").hasClass('open-confirm-add')){
                setTimeout(function () {
                    confirm_add('close');
                },10)
            }else{
                $("#main").removeClass(open_class);
            }

        }
    });

    $(window).bind('scroll', function () {
        if($(window).scrollTop() > 1500){
            $("#main").removeClass(open_class);
        }
    });
});


//檢查輸入框是否有文字
$(function() {
    $("select").on('change',function () {
        select_check(this);
    });

    function select_check(event) {
        var self = jQuery( event );

        var has_text_class = 'hastext';

        if(self.val() != -1) {
            self.addClass(has_text_class);
        }else{
            self.removeClass(has_text_class);
        }

    }


    $("input").on('blur',function () {
        input_check(jQuery(this),'');
    });

    $("textarea").on('blur',function () {
        input_check(jQuery(this),'');
    });

    $(".input.style-1.date_picker1 input").on('change',function () {
        input_check(jQuery(this),'');
    });


});


//TAB 控制器
$(function () {
    $('.tab-controller > *').on('click',function () {

        var $self = $( this );
        var $data = $( this ).attr('data-tab');

        if($self.hasClass('active')){

            //zat_log($data+'（active no work）','Tab');
            //return false;
        }

        zat_log($data,'Tab');

       /* if($data== 'signup-tab'){
            $(".step-signup").removeClass('hide');
            $(".general-signup-box").addClass('hide');
            $(".enterprise-signup-box").addClass('hide');
        }*/

        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        $('.'+$data).removeClass('hide');
        $('.'+$data).siblings('.tab-content').addClass('hide')
    });
});

//看更多重要專案
$(function () {

    $('#block-important .block-more').on('click',function () {
        zat_log('看更多重要專案','click')
        /*
        if($(this).hasClass('open')){
            $("#block-important .block-container").css({height: ($("#block-important .block-container").attr('data-min') * 50) + 'px'});
            $(this).find(".block-text").html('看更多重要專案 <i aria-hidden="true" class="fa fa-plus"></i>')
        }else {
            $("#block-important .block-container").css({height: ($("#block-important .block-important-item").length * 50) + 'px'});
            $(this).find(".block-text").html('顯示較少內容 <i aria-hidden="true" class="fa fa-minus"></i>')
        }
        $(this).toggleClass('open')
         */
    });

});


//
$(function () {
    $('#block-add-post .btn-item').on('click',function () {
        $('#block-add-post .btn-item').removeClass('active');
        $(this).addClass("active")
    });
});


$(function () {

    $(".metting-meeter").keydown(function(e){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        var keycode = e.which || e.keyCode;

        if (e && e.keyCode==13)
        {
            $(".meeter-tip-item.active").trigger('click');
        }

        if(keycode == 38){
            var $index = $(".meeter-tip-item").index($(".meeter-tip-item.active"));

            if($index > 0 ){
                $(".meeter-tip-item.active").prev().addClass('active');
                $(".meeter-tip-item").eq($index).removeClass('active');
            }
        }

        if(keycode == 40){
            var $index = $(".meeter-tip-item").index($(".meeter-tip-item.active"));

            if($index < $(".metting-meeter-list .meeter-tip-item").length - 1 ){
                $(".meeter-tip-item.active").next().addClass('active');
                $(".meeter-tip-item").eq($index).removeClass('active');
            }
        }
    });

    $(".metting-meeter-list").on('click',function (event) {
        if($(".metting-meeter").is(":focus") != true){
            setTimeout(function () {
                $(".metting-meeter").focus();
            },1);

            //loading_user_data($(".metting-meeter"))
            //alert("aa")
        }
    });

    $(".metting-meeter").keyup(function(){
        loading_user_data(this)
    });

    $(".metting-meeter").focus(function(){
        loading_user_data(this)
    });

    $(".metting-matter").focus(function(){
        output_user_data.length = 0;
        output_user_data.sort();
    });




    function loading_user_data(event) {
        var input_val = $(event).val();
        var html='';
        output_user_data.length = 0;


        $.each(user_data, function (i) {
            //alert(user_data[i].name.indexOf(input_val));
            if (user_data[i].name.indexOf(input_val,true) >= 0) {

                if(check_reapet(user_data[i].id) == true){
                    output_user_data.push(user_data[i])
                }
            }
        });

        output_user_data.sort();
    }


    function check_reapet(id) {
        var boolean = 1;

        $.each(edit_form_list,function (j) {
            if(edit_form_list[j].id == id){
                boolean = 0;
            }
        });
        if(boolean == 0){
            return false
        }else{
            return true
        }
    }


});
function cookie_toggle(event) {
    var $self = $(event);

    localStorage.setItem($self.attr('id'), $self.prop("checked"));
}




$(function () {

    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==27){ // 按 Esc
//要做的事情
        }
        if(e && e.keyCode==113){ // 按 F2
//要做的事情
        }
        if(e && e.keyCode==65){ // a 鍵
            //$(".block-filter .block-info ").toggleClass('test')
        }
        if(e && e.keyCode==80){ // p 鍵
            $(".test").toggleClass('hide')
            //$(".test.p ").removeClass('hide')
        }

        if(e && e.keyCode==76){ // l 鍵
            $(".zat_log").toggleClass('hide')
            //$(".test.p ").removeClass('hide')
        }
        /*
        if(e && e.keyCode==79){ // o 鍵
            $(".test").addClass('hide')
            $(".test.o ").removeClass('hide')
        }
        if(e && e.keyCode==73){ // i 鍵
            $(".test").addClass('hide')
            $(".test.i ").removeClass('hide')
        }
        if(e && e.keyCode==85){ // u 鍵
            $(".test").addClass('hide')
            $(".test.u ").removeClass('hide')
        }
        if(e && e.keyCode==89){ // y 鍵
            $(".test").addClass('hide')
            $(".test.y ").removeClass('hide')
        }
        if(e && e.keyCode==90){ // z 鍵
            $(".test").addClass('hide')}
         */
    };


})
var $clon;
var $fix_right;
var $fix_left;
var $right_fix_val;
var $left_fix_val;
var $load_more_val;

$(function () {
    $clon = $(".post-item").clone().html();
    $fix_right = $("#fix-right");
    $fix_left = $("#fix-left");
    $right_fix_val = ($("#block-datepicker").height() - ($(window).height() + $(window).scrollTop()) + 120);
    $left_fix_val = ($("#fix-left").height() - ($(window).height() + $(window).scrollTop()) + 120);
    $load_more_val = $('html,body').height() - ($(window).height() + $(window).scrollTop());
    //var right_block_height = $("#block-datepicker").height();
    //var left_block_height = $("#fix-left").height();

    for(var i=0;i < 3;i++){
        setTimeout(function () {
            meun_scroll();
        },i * 500);
    }

    $(window).bind('scroll', function () {
        meun_scroll();
    });
    $( window ).resize(function() {
        //重新計算選單高度
        /*
        meun_offset_top = $meunbar.offset().top;
        meun_scroll();
        */
    });


    $(".block-meeting-header").on('click',function () {
        $(this).closest('.block-meeting').toggleClass('open');
        //right_block_height = $("block-datepicker").height();
        meun_scroll();
    });

});

function meun_scroll(){
    var window_height = document.body.clientHeight;

    $right_fix_val = ($fix_right.height() - (window_height + $(window).scrollTop()) + 120);
    $left_fix_val = ($fix_left.height() - (window_height + $(window).scrollTop()) + 120);
    $load_more_val = $('html,body').height() - (window_height + $(window).scrollTop());


    //console.log(" 身體高度: "+$('html,body').height()+" 捲軸高度: "+$(window).scrollTop()+" 螢幕高度: "+ $(window).height()+" 元素高度: "+ $fix_right.height()+" 計算: "+ ($fix_right.height() - ($(window).height() + $(window).scrollTop()) + 120) )
    //console.log("右邊高度: "+$fix_right.height() + "螢幕高度: " + ($(window).height() - 120));


    if($fix_right.innerHeight() > window_height - 120){
        if($right_fix_val < 0){
            $fix_right.css({position: 'fixed',height:'auto',width: '270px',top: 'auto',bottom: '40px'});
        }else {
            $fix_right.css({position: 'static',height:'auto',width: 'auto',top: 'auto',bottom: 'auto'});
        }
    }else{
        $fix_right.css({position: 'fixed',height:'auto',width: '270px',top: '90px',bottom: 'auto'});
    }


    if($fix_left.innerHeight() > window_height - 120){
        if($left_fix_val < 0){
            $fix_left.css({position: 'fixed',height:'auto',width: '270px',top: 'auto',bottom: '40px'});
        }else {
            $fix_left.css({position: 'static',height:'auto',width: 'auto',top: 'auto',bottom: 'auto'});
        }
    }else{
        $fix_left.css({position: 'fixed',height:'auto',width: '270px',top: '90px',bottom: 'auto'});
    }

    if($load_more_val < 100){
       //$("#block-post").append("<div class='post-item metting block'>"+$clon+"</div>");
    }

}

$(function () {
    $('#window-alert .window-container').on('mousewheel', function(e, d) {
        meun_scroll();
    });



    function meun_scroll() {
        var $load_more_val = $('#window-alert .window-container').get(0).scrollHeight - ($('#window-alert .window-container').scrollTop() + $('#window-alert .window-container').height());
        if($load_more_val < 100){
            //window_alert_data.push(window_alert_data[window_alert_data.length-1])
        }
    }
});


$(function () {
    $("#block-filter .block-info").on('click',function () {
        //$(this).closest('#block-filter').toggleClass('open');
    });
});


$(function () {
    /*
    $(".post-inner-load-more").on('click',function () {
        if($(this).hasClass('open') == true){
            $(this).parent('.post-inner').find('.post-inner-container').addClass('hide');
            $(this).parent('.post-inner').find('.post-inner-container').eq(0).removeClass('hide');
            $(this).text('看更多');
            $(this).removeClass('open');
        }else{
            $(this).parent('.post-inner').find('.post-inner-container').removeClass('hide');
            $(this).text('隱藏');
            $(this).addClass('open');
        }

    });
    */
});

$(function () {
    $(".open-window-user-set").on('click',function () {
        $('#window-user-set').toggleClass('hide');
    });

    $( "html,body" ).click(function( event ) {
        var $window = $(event.target).closest('.window-user-set').length;
        var $toggle = $(event.target).closest('.open-window-user-set').length;
        if( $window == 0 && $toggle == 0){
            $("#window-user-set").addClass('hide');
        }
    });

});


$(function () {
    $(".open-block-filter-select").on('click',function () {
        $('#block-filter-select').toggleClass('hide');
    });

    $( "html,body" ).click(function( event ) {
        var $window = $(event.target).closest('.block-filter-select').length;
        var $toggle = $(event.target).closest('.open-block-filter-select').length;
        if( $window == 0 && $toggle == 0){
            $("#block-filter-select").addClass('hide');
        }
    });

});

$(function () {
    $(".open-post-permissions-select").on('click',function () {
        $('#post-permissions-select').toggleClass('hide');
    });

    $( "html,body" ).click(function( event ) {
        var $window = $(event.target).closest('.post-permissions-select').length;
        var $toggle = $(event.target).closest('.open-post-permissions-select').length;
        if( $window == 0 && $toggle == 0){
            $("#post-permissions-select").addClass('hide');
        }
    });

});


$(function () {
    $(".alert-menu-btn .menu-icon").on('click',function () {
        $(this).closest('.alert-menu-btn').toggleClass('open');
        $(this).closest('.alert-menu-btn').find('.window').toggleClass('hide');
    });

    $( "html,body" ).click(function( event ) {
        var $toggle = $(event.target).closest('.alert-menu-btn').length;
        if( $toggle == 0){
            $("#window-alert").addClass('hide');
            $(".alert-menu-btn").removeClass('open');
        }
    });
});



$(function () {

    $( "html,body" ).click(function( event ) {
        var $toggle = $(event.target).closest('.metting-meeter-list .new-tag').length;
        if( $toggle == 0){
            output_user_data.length = 0;
            output_user_data.sort();
        }
    });
});

//動態通知
$(function() {

    var toolbox = $('#window-alert .window-container');

    toolbox.on('mousewheel', function(e, d) {
        var scrollHeight = toolbox.get(0).scrollHeight;
        var height = toolbox.height();

        if((this.scrollTop === 0 && d > 0)) {
            e.preventDefault();
        }
        if((this.scrollTop === (scrollHeight - height) && d < 0)) {
            e.preventDefault();
        }
    });

});

//重要專案
$(function() {

    var toolbox = $('#block-important .block-container');

    toolbox.on('mousewheel', function(e, d) {
        var scrollHeight = toolbox.get(0).scrollHeight;
        var height = toolbox.height();

        if((this.scrollTop === 0 && d > 0)) {
            e.preventDefault();
        }
        if((this.scrollTop === (scrollHeight - height) && d < 0)) {
            e.preventDefault();
        }
    });

});

//自製log
$(function() {

    var toolbox = $('#zat_log');

    toolbox.on('mousewheel', function(e, d) {
        var scrollHeight = toolbox.get(0).scrollHeight;
        var height = toolbox.height();

        if((this.scrollTop === 0 && d > 0)) {
            e.preventDefault();
        }
        if((this.scrollTop === (scrollHeight - height) && d < 0)) {
            e.preventDefault();
        }
    });

});


$(function() {
    if($("#block-add-post").length > 0){
        var $block = $("#block-add-post");
        var $highlights = $block.find(".input-text .textarea_highlights");
        var $textarea = $block.find(".input-text .textarea");

        var ua = window.navigator.userAgent.toLowerCase();
        var isIE = !!ua.match(/msie|trident\/7|edge/);
        var isWinPhone = ua.indexOf('windows phone') !== -1;
        var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

        function applyHighlights(text) {
            text = text
                .replace(/\n$/g, '\n\n')
                .replace(/[A-Z].*?\b/g, '<mark>$&</mark>');

            if (isIE) {
                // IE wraps whitespace differently in a div vs textarea, this fixes it
                text = text.replace(/ /g, ' <wbr>');
            }

            return text;
        }

        function handleInput() {
            var text = $textarea.val();
            var highlightedText = applyHighlights(text);
            $highlights.html(highlightedText);
        }


        function bindEvents() {
            $textarea.on({
                'input': handleInput
            });
        }

        bindEvents();
        handleInput();
    }
});




$(function() {
    $('[data-toggle="tooltip"]').tooltip({
        animation: false,
        delay: {show: 0, hide: 0}
    });
});


function confirm(event) {
    var key_num = event.keyCode;
    if (38 == key_num) {
        event.preventDefault();
        // return false;
    }
}


$(function () {
    $('.block-more').on('click',function () {
        setTimeout(function () {
           //meun_scroll();
        },301)
    });
});

//頁面載入就回到最上方
$(function() {
    setTimeout(function () {
        $(window).scrollTop(0)
    },1000)
});


//新增工作事項
//type: complete/cancel/close/open
function confirm_add(type) {
    switch (type) {
        case 'complete':
            $('body').removeClass('open-confirm-add');
            break;
        case 'close':
            $('body').removeClass('open-confirm-add');
            break;
        case 'open':
            $('body').addClass('open-confirm-add');
            break;
    }




}

//判斷是否是json格式
function isJSON (str) {
    var obj;

    try{
        obj = eval("(" + str + ")");
    }catch(e){
    }
    var xy = Object.prototype.toString.call(obj);
    if (xy == "[object Object]" || xy == "[object Array]") {
        return true;
    } else {
        return false;
    }
}
