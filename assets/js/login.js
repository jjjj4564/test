//防止重複發送ajax
var user_exist_ajax_flag = 1;

//暫存username
var cookie_login_form_username = '';
var cookie_url_stage = location.href.slice(location.href.lastIndexOf("/")+1,location.href.length);
$(function (){
    login_tab('register');
    login_tab('login');

    $('.login-tab-group .'+cookie_url_stage+'-tab').trigger('click');

});


var enterprise_tags_data =[];

//Vue 企業營業項目
$( function() {
    initime = new Date().getTime();

    if($("#enterprise-tag-list").length > 0){
        var vm = new Vue({
            el: '#enterprise-tag-list',
            data: {
                items: enterprise_tags_data
            },
            methods: {
                del: function (item) {
                    this.items.splice(item, 1);
                }
            }
        })
    }
});


var initime = new Date().getTime();


//登入框 記得帳號  //顯示表單
$(function() {
    if($("#login-form").length > 0){

        //判斷有無記得記得帳號
        if(localStorage.getItem("account") != null){
            var $form = $("#login-form");
            var $account = $form.find('.account');
            var $password = $form.find('.password');

            //填入暫存帳號到輸入框
            $account.val(localStorage.getItem("account")).addClass('hastext');
            $password.addClass('hastext');

            //打勾
            $("#remember").attr("checked",true);
        }

        //檢查
        $.each($("input"), function (i) {
            if($(this).val().length > 0){
                $(this).addClass('hastext');
            }
        });


        if($('#login-form .account').val().length > 0  && $('#login-form .password').val().length > 0){
            $('#login-form .submit').removeClass('disabled');
        }

        //顯示表單
        $("#login").removeClass('hide');
    }
});
//引入密碼驗證套件
$(function() {
    $("#enterprise-password").strength({
        eleID: 'enterprise-password',
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
        strengthButtonText: '',
        strengthButtonTextToggle: ''
    });
    $("#general-password").strength({
        eleID: 'general-password',
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
        strengthButtonText: '',
        strengthButtonTextToggle: ''
    });
});
//引入日期選擇套件
$(function () {
    var $locale = 'zh-tw';

    //一般會員註冊－生日
    $("#general-step-2 .birth").datetimepicker({
        locale: $locale,
        format: 'YYYY/MM/DD'
    })

});

//登入按鈕 送出disabled
$(function () {
    setTimeout(function () {
        var $form = $("#login-form");
        var $account = $form.find('.account');
        var $password = $form.find('.password');
        var $submit = $form.find('.submit');

        $account.keyup(function() {
            check_form();
        });

        $password.keyup(function() {
            check_form();
        });

        function check_form() {
            if($account.val() == '' || $password.val() == ''){
                $submit.addClass('disabled');
            }else{
                $submit.removeClass('disabled');
            }
        }
    },600);
});

//企業營業項目
$(function() {
    $(".enterprise-tag").keydown(function(e){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        var keycode = e.which || e.keyCode;
        var $val = $(".enterprise-tag").val();
        var $index = $(".enterprise-tag-list li").index($(".enterprise-tag-list .new-tag"));

        if (e && e.keyCode==13)
        {
            if($val != ''){
                enterprise_tags_data.push({"value": $val});

                enterprise_tags_data.sort();


                //$(".enterprise-tag-list .new-tag").before('<li class="tags">'+$val+'<i class="p-icon p-close" onclick="delete_tag('+"'enterprise-tag'"+',this)"></i><input tabindex="-1" name="tags[]" type="hidden" value="'+$val+'"></li>');

                $(".enterprise-tag").val('');
            }
        }
    });
});
//刪除企業營業項目
function delete_tag(tag_name,event) {
    var $tag_name = tag_name;
    var $self = $(event);

/*
    if($tag_name == 'enterprise-tag'){
        $self.closest('.tags').fadeOut(function () {
            $(this).remove();
        })

    }
    */
};

//表單送出(登入表單)
function form_submit_login(){
    var $form = $("#login-form");
    var $account = $form.find('.account');
    var $password = $form.find('.password');
    var $submit = $form.find('.submit');

    var $input = $form.find('.required');

    if($account.val() == '' || $password.val() == ''){
        zat_log('帳密沒有填好填滿','Tip');
        return false;
    }

    if($submit.hasClass('disabled')){
        zat_log('登入表單不送出','Tip');
        return false;
    }else{
        zat_log('登入表單送出','Tip');
    }


    if($("#remember").prop("checked")){
        //已選取
        localStorage.setItem('account', $account.val());
    }else{
        //未選取
        localStorage.removeItem("account");
    }

    $form.submit();
};
//表單送出(一般註冊表單)
function form_submit_register_general(){
    var $form = $("#general-register-form");

    var $input = $form.find('.required');
    var num = 0;
    var re_num = 0;
    var last_focus = -1;

    $.each($input.get().reverse(),function (i) {
        var re_num = input_check(jQuery(this),'required');

        num += re_num;

        if(re_num > 0){
            last_focus = i+1;
        }
    });
    //最後找到的欄位focus
    $input.eq($input.length - last_focus).focus();

    if(num == 0){
        $form.submit();
    }
}
//表單送出(企業註冊表單)
function form_submit_register_enterprise(){
    var $form = $("#enterprise-register-form");

    var $input = $form.find('.required');
    var num = 0;
    var re_num = 0;
    var last_focus = -1;

    $.each($input.get().reverse(),function (i) {
        var re_num = input_check(jQuery(this),'required');

        num += re_num;

        if(re_num > 0){
            last_focus = i+1;
        }
    });
    //最後找到的欄位focus
    $input.eq($input.length - last_focus).focus();

    if(num == 0){
        $form.submit();
    }
}

//選擇會員等級 type: general/enterprise
function chose_register_type(type) {


    if (type == 'general') {

        //選擇會員div
        jQuery(".step-register").addClass('hide');

        //企業會員div(隱藏)
        jQuery(".enterprise-register-box").addClass('hide');

        //一般會員div(顯示)
        jQuery(".general-register-box").removeClass('hide');

        //一般會員左上文字
        jQuery(".register-general-tab").siblings().addClass('hide');
        jQuery(".register-general-tab").removeClass('hide');

        //步驟１２
        jQuery(".general-step-1").removeClass('hide');
        jQuery(".general-step-2").addClass('hide');


        zat_log('選擇一般會員註冊', 'Click')
    }

    if (type == 'enterprise') {
        //選擇會員div
        jQuery(".step-register").addClass('hide');

        //一般會員div(隱藏)
        jQuery(".general-register-box").addClass('hide');

        //企業會員div(顯示)
        jQuery(".enterprise-register-box").removeClass('hide');

        //企業會員左上文字
        jQuery(".register-enterprise-tab").siblings().addClass('hide');
        jQuery(".register-enterprise-tab").removeClass('hide');

        //步驟１２３
        jQuery(".enterprise-step-1").removeClass('hide');
        jQuery(".enterprise-step-2").addClass('hide');
        jQuery(".enterprise-step-3").addClass('hide');

        zat_log('選擇企業會員註冊', 'Click')
    }

    clear_form('enterprise');
    clear_form('general');

    $(".step-register").addClass('hide');


    function clear_form(form) {

        //reset
        $("#" + form + "-register-form")[0].reset();

        //清除多餘class
        var class_arr = ['iserror', 'is_check', 'hastext', 'week-password', 'error-repeat', 'error-email'];

        $.each(class_arr, function (i) {
            clear_class(class_arr[i])
        })

        function clear_class(classname) {
            $.each($("#" + form + "-register-form ." + classname), function () {
                $(this).removeClass(classname);
            });
        }

        //企業項目
        if ($(".enterprise-tag-list .tags").length > 0) {
            $(".enterprise-tag-list .tags").remove();
        }
        ;

        //密碼強度
        $("#" + form + "-register-form .strength_meter > div").attr('class', '').html('無')
    }
};
//檢查欄位和下一步 event: [object], next: (next object ID)
function check_required_and_next_step(ele,next) {

    switch (ele){
        case '#general-step-1':
            //一般會員步驟１ 下一步
            if(check() == 0 ){
                $("#general-step-1").addClass('hide');
                $("#general-step-2").removeClass('hide');

                $(window).scrollTop(0);
            }
            break;
        case '#general-step-2':
            //一般會員步驟２ 上一步
            $("#general-step-1").removeClass('hide');
            $("#general-step-2").addClass('hide');

            $(window).scrollTop(0);
            break;
        case '#enterprise-step-1':
            //企業會員步驟１ 下一步
            if(check() == 0 ){
                $("#enterprise-step-1").addClass('hide');
                $("#enterprise-step-2").removeClass('hide');
                $("#enterprise-step-3").addClass('hide');

                $(window).scrollTop(0);
            }
            break;
        case '#enterprise-step-2':
            switch (next){
                case '#enterprise-step-1':
                    //企業會員步驟２ 上一步
                    $("#enterprise-step-1").removeClass('hide');
                    $("#enterprise-step-2").addClass('hide');
                    $("#enterprise-step-3").addClass('hide');

                    $(window).scrollTop(0);
                    break;
                case '#enterprise-step-3':
                    //企業會員步驟２ 開始企業認證
                    $("#enterprise-step-1").addClass('hide');
                    $("#enterprise-step-2").addClass('hide');
                    $("#enterprise-step-3").removeClass('hide');

                    $(window).scrollTop(0);
                    break;
            }
            break;
        case '#enterprise-step-3':
            //企業會員步驟３ 上一步
            $("#enterprise-step-1").addClass('hide');
            $("#enterprise-step-2").removeClass('hide');
            $("#enterprise-step-3").addClass('hide');

            $(window).scrollTop(0);
            break;
    }


    function check() {
        var $event = jQuery(ele);
        var $input = $event.find('.required');

        var num = 0;
        var last_focus = -1;

        zat_log("下一步／上一步","click");
        zat_log("「"+ele+"」",'check');
        zat_log("////////////////////",'▼');

        $.each($input.get().reverse(),function (i) {
            var re_num = input_check(jQuery(this),'required')

            num += re_num;

            if(re_num > 0){
                last_focus = i+1;
            }
        });
        zat_log("////////////////////",'▲');
        //最後找到的欄位focus
        $input.eq($input.length - last_focus).focus();

        return num;
    }

};
//檢查欄位 event: [object], type: ''/required
function input_check(event,type) {

    if(event instanceof jQuery){
        var self = event;
    }else{
        var self = jQuery( event );
    }

    var type = type;

    var num = 0;

    var has_text_class = 'hastext';
    var is_error_class = 'iserror';
    var load_class = 'check_load';
    var check_class = 'is_check';
    var is_error_eamil_class = 'error-email';
    var is_error_repeat_class = 'error-repeat';
    var is_week_password_class = 'week-password';

    //if(self.val() != '' || type == 'required'){

    if(self.val() != ''){
        self.addClass(has_text_class);
    }else{
        self.removeClass(has_text_class);
    }
    //self.parent('label').addClass(load_class);
    setTimeout(function () {
        //self.parent('label').removeClass(load_class);
        //self.parent('label').addClass(check_class);
    },300)

    //密碼強度
    if(self.hasClass('expassword')) {
        if (self.siblings('.strength_meter').find('div').hasClass('is_ok') == true) {
            //self.parent('label').addClass(check_class);
            self.parent('label').removeClass(is_week_password_class);
        } else {
            self.parent('label').addClass(is_week_password_class);
            //self.parent('label').removeClass(check_class);

            //self.focus();
            num ++;
            zat_log('密碼強度('+self.attr('name')+')','Tip')
        }
    }


    //必填
    if(self.hasClass('required')){
        if(self.val() != '' ){
            self.removeClass(is_error_class);
        }else if(type == 'required'){
            self.addClass(is_error_class);

            //self.focus();
            num ++;
            zat_log('必填欄位('+self.attr('name')+')','Tip');
        }
    }

    //密碼
    if(self.hasClass('original') && self.val() != ''){
        var $original = self.parents('form').find('.repeat').val();
        var $repeat = self.val();

        if($original != $repeat){
            self.parents('form').find('.repeat').parent('label').removeClass(check_class);
        }else{
            //self.parents('form').find('.repeat').parent('label').addClass(check_class);
            self.parents('form').find('.repeat').parent('label').removeClass(is_error_repeat_class);
        }


    }
    //alert($original+" "+$repeat)

    //再次輸入密碼
    if(self.hasClass('repeat') && self.val() != ''){
        var $original = self.parents('form').find('.original').val();
        var $repeat = self.val();

        if($original != $repeat){
            //self.parent('label').removeClass(check_class);
            self.parent('label').addClass(is_error_repeat_class);

            //self.focus();
            num ++;
            zat_log('密碼不一樣('+self.attr('name')+')','Tip')
        }else{
            //self.parent('label').addClass(check_class);
            self.parent('label').removeClass(is_error_repeat_class);
        }
    }



    //email 又稱 username
    if(self.hasClass('email')){
        var strEmail = self.val();

        //Regular expression Testing
        var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

        //validate ok or not
        if(strEmail.search(emailRule)!= -1){
            //self.parent('label').addClass(check_class);
            self.parent('label').removeClass(is_error_eamil_class);


            //要先過email驗證
            zat_log('/user/exist', 'Post');
            zat_log(self.val(), 'username');

            user_exist_ajax_flag = 0;

            initime = new Date().getTime();

            if(cookie_login_form_username != self.val()){
                //ajax user/exist

                //判斷要送哪個ajax
                var email_router = ''

                if(self.hasClass('general-email')){
                    email_router = 'user'
                }

                if(self.hasClass('enterprise-email')){
                    email_router = 'enterprise'
                }

                $.ajax($api_url + '/api/'+ email_router +'/exist', {
                    type: 'POST',
                    async: false,
                    data: {
                        username: self.val(),
                    },
                    error: function (data){
                        zat_log("("+email_router+"-email驗證) ERROR:" + data,'ajax')
                    },
                    complete: function (jqXHR) {
                        console.log(jqXHR);

                        zat_log("("+email_router+"-email驗證)" + (new Date().getTime() - initime) + "ms",'ajax')

                        user_exist_ajax_flag = 1;

                        var responseText = jqXHR.responseText;

                        if(isJSON(responseText) == false){
                            zat_log(responseText,'error');
                            return false
                        }

                        var $res = JSON.parse(responseText);
                        var $val_status = $res.status;


                        if($val_status == 'USER_EXIST'){

                            self.addClass(is_error_class);
                            if(self.siblings(".error-tip.user-exist").length == 0) {
                                self.parent('label').append('<div class="error-tip user-exist text-red">您的電子郵件已被註冊</div>');
                            }
                            num ++;
                        }

                        if($val_status == 'USER_NOT_EXIST'){
                            cookie_login_form_username = self.val();

                            if(self.siblings(".error-tip.user-exist").length > 0){
                                self.siblings(".error-tip.user-exist").remove();
                            }
                        }

                        zat_log(jqXHR.responseText, 'complete');
                        console.log(jqXHR);
                        console.log("jqXHR.responseText: "+jqXHR.responseText);
                    }
                });
            }else{
                zat_log('欄位沒有變更不送ajax', 'tip');
            }



        }else{
            //self.parent('label').removeClass(check_class);
            self.parent('label').addClass(is_error_eamil_class);

            //self.focus();
            num ++;
            zat_log('郵件格式('+self.attr('name')+')','Tip')
        }

    }


    if((num == 0 && self.val() != '') && (self.hasClass('email') || self.hasClass('repeat') || self.hasClass('original') || self.hasClass('expassword'))){
        self.parent('label').addClass(check_class);
    }else{
        self.parent('label').removeClass(check_class);
    }

    if((num != 0 && type == 'required')){
        $(window).scrollTop($(window).scrollTop()-70);
    }




    //} else {
    /*self.removeClass(has_text_class);
     if(self.parent('label').hasClass(check_class)){
     self.parent('label').addClass(load_class);
     setTimeout(function () {
     self.parent('label').removeClass(check_class);
     self.parent('label').removeClass(load_class);
     },300)
     //}
     */
    //}

    /*
     //必填
     if(self.hasClass('required')){
     if(self.val() != ''){
     self.removeClass(is_error_class);
     }else{
     self.addClass(is_error_class);

     //self.focus();
     num ++;
     }
     }
     */
    return num ;
};

//登入頁右上角tab type: login/register
function login_tab(type) {
    if($(".login-tab-group > .tab."+type+"-tab").hasClass('active') == true){

        return false
    }


    switch (type) {
        case 'login':

            break;

        case 'register':
            $(".step-register").removeClass('hide');
            $(".general-register-box").addClass('hide');
            $(".enterprise-register-box").addClass('hide');
            break;
    }

    $(".login-tab-group > .tab").removeClass('active');
    $(".login-tab-group > .tab."+type+"-tab").addClass('active');

    $(".login-text-tab-content-group > .tab-content").addClass('hide');
    $(".login-text-tab-content-group > .tab-content."+type+"-tab").removeClass('hide');

    $(".login > .tab-content").addClass('hide');
    $(".login > .tab-content."+type+"-tab").removeClass('hide');

}

//無痛換網址
(function(window,undefined){
    $(function() {
        // Prepare
        var History = window.History; // Note: We are using a capital H instead of a lower h

        $('.login-tab-group > div').click(function(e){
            var $href = $(this).attr('href');
            var $data = [{
                url: $href.slice($href.lastIndexOf("/")+1,$href.length)
            }];
            var $title = $href.slice($href.lastIndexOf("/")+1,$href.length);

            cookie_url_stage = $title;

            History.pushState($data, 'planXcape', $(this).attr('href'));
            //e.preventDefault();
        })

        History.Adapter.bind(window,'statechange',function(){
            var State = History.getState();
            var $title = State.title;
            var $data = State.data;

            if( cookie_url_stage != $data[0].url){
                cookie_url_stage = $data[0].url;

                zat_log(cookie_url_stage,'History')

                $('.login-tab-group .'+$data[0].url+'-tab').trigger('click');

                History.log(State.data, State.title, State.url);
            }
        });
    });
})(window);

