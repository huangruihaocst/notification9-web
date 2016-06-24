/**
 * Created by huangruihao on 16-5-29.
 */
'use strict';

// a helper function
function showAlert(type, text){
    if (type == 'success') {
        $('#alert').hide();
        $('#success_message').html(text);
        $('#success').show();
    } else if (type == 'alert') {
        $('#success').hide();
        $('#alert_message').html(text);
        $('#alert').show();
    } else {
        // add more types here
    }
}

function unbindLearn(source, token) {
    // if the user has bind the source
    $('#learn_status').text('已绑定');
    $('#learn_bind').text('解绑')
        .addClass('btn btn-danger btn-sm')
        .attr('data-toggle', null)
        .attr('data-target', null)
        .removeClass('btn-primary')
        .click(function() {
            $.ajax({
                type: 'POST',
                url: source + '/api/v1/unbind?token=' + token,
                success: function (res) {
                    res = JSON.parse(res);
                    if (res['status'] == 'ok') {
                        showAlert('success', '解绑成功');
                        $('#learn_modal').modal('hide');
                        bindLearn(source, token);
                    } else {
                        showAlert('alert', '未知错误<strong>(·8·)</strong>');
                    }
                }
            });
        });
}

function bindLearn(source, token) {
    // if the user has not bind the source
    $('#learn_status').text('未绑定');
    $('#learn_bind').text('绑定')
        .removeClass('btn-danger')
        .addClass('btn btn-primary btn-sm')
        .attr('data-toggle', 'modal')
        .attr('data-target', '#learn_modal');
    $('#learn_form').submit(function (e){
        e.preventDefault();
        var username = $('#learn_username').val();
        var password = $('#learn_password').val();
        if (username == '') {
            $('#message').html('用户名不能为空<strong>(·8·)</strong>');
            $('#alert').show();
        } else if (password == '') {
            $('#message').html('密码不能为空<strong>(·8·)</strong>');
            $('#alert').show();
        } else {
            $.ajax({
                type: 'POST',
                url: source + '/api/v1/register?username=' + username + '&password=' + password + '&token=' + token,
                success: function (res){
                    res = JSON.parse(res);
                    if (res['status'] == 'ok') {
                        $('#alert').hide();
                        $('#success_message').text('绑定成功');
                        $('#success').show();
                        $('#learn_modal').modal('hide');
                        unbindLearn(source, token);
                    } else {
                        if (res['reason'] == 'not a tsinghua account') {
                            showAlert('alert', '这不是一个清华账号<strong>(·8·)</strong>');
                        } else {
                            showAlert('alert', '未知错误<strong>(·8·)</strong>');
                        }
                    }
                }
            });
        }
    });
}

function unbindGitHub(source, token) {
    // if the user has bind the source
    $('#github_status').text('已绑定');
    $('#github_bind').text('解绑')
        .attr('data-toggle', null)
        .attr('data-target', null)
        .removeClass('btn-primary')
        .addClass('btn btn-danger btn-sm')
        .click(function () {
            alert('这里解绑');
        });
}

function bindGitHub(source, token) {
    // if the user has not bind the source
    $('#github_status').text('未绑定');
    $('#github_bind').text('绑定')
        .removeClass('btn-danger')
        .addClass('btn btn-primary btn-sm')
        .attr('data-toggle', 'modal')
        .attr('data-target', '#github_modal');
    $('#github_form').submit(function (e) {
        e.preventDefault();
        var username = $('#github_username').val();
        var g_token = $('#github_token').val();
        if (username == '') {
            $('#message').html('用户名不能为空<strong>(·8·)</strong>');
            $('#alert').show();
        } else if (g_token == '') {
            $('#message').html('Token不能为空<strong>(·8·)</strong>');
            $('#alert').show();
        } else {
            $.ajax({
                type: 'POST',
                url: source + '/api/v1/register?github_user_name=' + username + '&github_token='
                + g_token + '&token=' + token,
                success: function (res){
                    res = JSON.parse(res);
                    if (res['status'] == 'ok') {
                        $('#alert').hide();
                        $('#success_message').text('绑定成功');
                        $('#success').show();
                        $('#learn_modal').modal('hide');
                        unbindLearn(source, token);
                    } else {
                        if (res['reason'] == '') {
                            // no available reason
                        } else {
                            showAlert('alert', '未知错误<strong>(·8·)</strong>');
                        }
                    }
                }
            });
        }
    });
}

function unbindVultr(source, token) {
    // if the user has bind the source
    $('#vultr_status').text('已绑定');
    $('#vultr_bind').text('解绑')
        .attr('data-toggle', null)
        .attr('data-target', null)
        .removeClass('btn-primary')
        .addClass('btn btn-danger btn-sm')
        .click(function () {
            alert('这里解绑');
        });
}

function bindVultr(source, token) {
    // if the user has not bind the source
    $('#vultr_status').text('未绑定');
    $('#vultr_bind').text('绑定')
        .removeClass('btn-danger')
        .addClass('btn btn-primary btn-sm')
        .attr('data-toggle', 'modal')
        .attr('data-target', '#vultr_modal');
    $('#vultr_form').submit(function (e){
        e.preventDefault();
        var username = $('#vultr_username').val();
        var v_token = $('#vultr_token').val();
        if (username == '') {
            showAlert('alert', '用户名不能为空<strong>(·8·)</strong>');
        } else if (v_token == '') {
            showAlert('alert', 'Token不能为空<strong>(·8·)</strong>');
        } else {
            $.ajax({
                type: 'POST',
                url: source + '/api/v1/register?username=' + username + '&vultr_token=' + token + '&token=' + token,
                success: function (res){
                    res = JSON.parse(res);
                    if (res['status'] == 'ok') {
                        $('#alert').hide();
                        $('#success_message').text('绑定成功');
                        $('#success').show();
                        $('#learn_modal').modal('hide');
                        unbindLearn(source, token);
                    } else {
                        if (res['reason'] == '') {
                            // no available reason
                        } else {
                            showAlert('alert', '未知错误<strong>(·8·)</strong>');
                        }
                    }
                }
            });
        }
    });
}

function appendSource(source, token, url, index) {
    $('#no_subscriptions').hide();
    var button_id = 'button_' + index;
    var li_id = 'li_' + index;
    var button = '<button  type="button" class="close col-sm-1" id=' + button_id +
        '><span aria-hidden="true">&times;</span></button>';
    var html = '<li class="row" id=' + li_id + '><a class="col-sm-10" target="_blank" href="'
        + url + '">' + url + '</a>' + button + '</li>';
    $('#rss_subscriptions').append(html).show();
    $('#' + button_id).click(function () {
        $.ajax({
            type: 'POST',
            url: source + '/api/v1/unsubscribe?url=' + url + '&token=' + token,
            success: function (res) {
                res = JSON.parse(res);
                if (res['status'] == 'ok') {
                    $('#' + li_id).remove();
                    if ($('#rss_subscriptions').children().length == 0) {
                        $(this).hide();
                        $('#no_subscriptions').show();
                    }
                } else {
                    showAlert('alert', '未知错误<strong>(·8·)</strong>');
                }
            }
        });
    });
}

function subscribe(source, token, url) {
    $.ajax({
        type: 'POST',
        url: source + '/api/v1/subscribe?token=' + token + '&url=' + url,
        success: function (res) {
            res = JSON.parse(res);
            if (res['status'] == 'ok') {
                appendSource(source, token, url, $('#rss_subscriptions').children().length);
                $('#subscribe').val('');
            } else {
                if (res['reason'].contains('bad URI')) {
                    showAlert('alert', '不合法的网址<strong>(·8·)</strong>');
                } else {
                    showAlert('alert', '未知错误<strong>(·8·)</strong>');
                }

            }
        }
    });
}

function setRSSModal(source, token) {
    $.ajax({
        type: 'GET',
        url: source + '/api/v1/sources?token=' + token,
        success: function (res) {
            res = JSON.parse(res);
            if (res['status'] == 'ok') {
                var sources = res['sources'];
                if (sources.length > 0) {
                    for(var index in sources) {
                        if (sources.hasOwnProperty(index)) {
                            appendSource(source, token, sources[index], index.toString());
                        }
                    }
                } else {
                    $('#rss_subscriptions').hide();
                    $('#no_subscriptions').show();
                }
            } else {
                showAlert('alert', '未知错误<strong>(·8·)</strong>');
            }
        }
    });
    $('#rss_form').submit(function (e) {
        e.preventDefault();
        var url = $('#subscribe').val();
        if (url == '') {
            showAlert('alert', '订阅网址不能为空<strong>(·8·)</strong>');
        } else {
            subscribe(source, token, url);
        }
    });
}

function manageRSSSubscribe(source, token) {
    // check if user has RSS subscription
    $.ajax({
        type: 'GET',
        url: source + '/api/v1/check_registered?token=' + token,
        success: function (result) {
            result = JSON.parse(result);
            if (result['status'] == 'ok') {
                if (result['registered']) {
                    $('#rss_status').text('有订阅');
                } else {
                    $('#rss_status').text('没有订阅');
                }
                $('#rss_bind').text('管理订阅')
                    .addClass('btn btn-primary btn-sm')
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '#rss_modal');
                setRSSModal(source, token);
            } else {
                showAlert('alert', '未知错误<strong>(·8·)</strong>');
            }
        }
    });
}

function setSource(source, token, bindSource, unbindSource) {
    // check registered
    $.ajax({
        type: 'GET',
        url: source + '/api/v1/check_registered?token=' + token,
        success: function (result) {
            result = JSON.parse(result);
            if (result['status'] == 'ok') {
                if (result['registered']) {
                    unbindSource(source, token);
                } else {
                    bindSource(source, token);
                }
            } else {
                showAlert('alert', '未知错误<strong>(·8·)</strong>');
            }
        }
    });
}

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
                            if (key == 'learn') {
                                setSource(sources[key], token, bindLearn, unbindLearn);
                            } else if (key == 'github') {
                                setSource(sources[key], token, bindGitHub, unbindGitHub);
                            } else if (key == 'vultr') {
                                setSource(sources[key], token, bindVultr, unbindVultr);
                            } else if (key == 'rss') {
                                // manageRSSSubscribe(sources[key], token);
                            } else {
                                // add more sources here
                            }
                        }
                    }
                    manageRSSSubscribe('http://localhost:8007', token);
                } else {
                    showAlert('alert', '未知错误<strong>(·8·)</strong>');
                }
            }
        });

    });
});