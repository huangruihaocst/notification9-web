/**
 * Created by huangruihao on 16-5-29.
 */
'use strict';
$(document).ready(function(){
    var token = $('#token').text();
    $.get('../js/config.json', function(data) {
        $.ajax({
            type: 'GET',
            url: data['scheduler']['host'] + ':' + data['scheduler']['port'] + '/api/v1/all_sources?token=' + token,
            success: function(response) {
                response = JSON.parse(response);
                if (response['status'] == 'ok') {
                    var sources = response['sources']; // dict
                    for (var key in sources) {
                        if (sources.hasOwnProperty(key)) {
                            $.ajax({
                                type: 'GET',
                                url: sources[key] + '/api/v1/check_registered?token=' + token,
                                success: function () {
                                    var backup = (' ' + key).slice(1); // backup key
                                    return function (result) {
                                        if (backup != 'learn') {
                                            result = JSON.parse(result);
                                        }
                                        if (result['status'] == 'ok') {
                                            if (backup == 'github') {
                                                if (result['registered']) {
                                                    $('#github_status').text('已绑定');
                                                    $('#github_bind').text('解绑').addClass('btn btn-danger btn-sm');
                                                } else {
                                                    $('#github_status').text('未绑定');
                                                    $('#github_bind').text('绑定').addClass('btn btn-primary btn-sm')
                                                        .attr('data-toggle', 'modal').attr('data-target', '#github_modal');
                                                }
                                            } else if (backup == 'vultr') {
                                                if (result['registered']) {
                                                    $('#vultr_status').text('已绑定');
                                                    $('#vultr_bind').text('解绑').addClass('btn btn-danger btn-sm');
                                                } else {
                                                    $('#vultr_status').text('未绑定');
                                                    $('#vultr_bind').text('绑定').addClass('btn btn-primary btn-sm')
                                                        .attr('data-toggle', 'modal').attr('data-target', '#vultr_modal');
                                                }
                                            } else if (backup == 'learn') {
                                                if (result['registered']) {
                                                    $('#learn_status').text('已绑定');
                                                    $('#learn_bind').text('解绑').addClass('btn btn-danger btn-sm');
                                                } else {
                                                    $('#learn_status').text('未绑定');
                                                    $('#learn_bind').text('绑定').addClass('btn btn-primary btn-sm')
                                                        .attr('data-toggle', 'modal').attr('data-target', '#learn_modal');
                                                }
                                            }
                                        } else {
                                            $('#alert').show();
                                        }
                                    };
                                } ()
                            });
                        }
                    }
                } else {
                    $('#alert').show();
                }
            }
        });

    });
});