
//取得是哪種行爲 會議, 工作事項, 里程碑

function getActionType() {

}

function postSubmit() {

    let type = $('.tab-controller').find('.active').attr('data-tab');

    switch (type) {
        case 'meeting':
            break;
        case 'comfirm':
            break;
        case 'milestone':
            let milestone = getMilestoneInput();
            milestone_add(milestone);
            break;
    }
}

function getMilestoneInput() {

    let milestone = {};

    milestone.comment = $('.message textarea').val();
    //取得 起始日期, 結束日期, 里程碑名稱, 專案名稱
    let input = $('.block-edit-milestone').find('input');
    milestone.setting = {};
    for(let i = 0 ; i < input.length ; i++) {
        let key     = $(input[i]).attr('name');
        let value   = $(input[i]).val();
        milestone.setting[key] = value;
    }

    milestone.csrf_token = $('input#csrf_token').val();
    return milestone;
}

function milestone_add(milestone) {
    $.ajax($api_url + '/milestone/add', {
        type: 'POST',
        async: false,
        data: {
            start_date:     milestone.setting.start_date,
            end_date:       milestone.setting.end_date,
            comment:        milestone.comment,
            name:           milestone.setting.name,
            __csrf_token:   milestone.csrf_token
        },
        error: function (data){
            console.log(data.responseText);
        },
        complete: function (jqXHR) {
            console.log(jqXHR.responseText);
        }
    });
}