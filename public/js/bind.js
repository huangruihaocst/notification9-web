/**
 * Created by huangruihao on 16-5-29.
 */
'use strict';
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
                type: 'DEL',
                url: source + '/api/v1/register?token=' + token,
                success: function (res) {
                    res = JSON.parse(res);
                    if (res[status] == 'ok') {
                        $('#alert').hide();
                        $('#success_message').text('解绑成功');
                        $('#success').show();
                        $('#learn_modal').modal('hide');
                        bindLearn(source, token);
                    } else {
                        $('#message').html('未知错误<strong>(·8·)</strong>');
                        $('#alert').show();
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
                            $('#message').html('这不是一个清华账号<strong>(·8·)</strong>');
                            $('#alert').show();
                        } else {
                            $('#message').html('未知错误<strong>(·8·)</strong>');
                            $('#alert').show();
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
                            // no supporting reason
                        } else {
                            $('#message').html('未知错误<strong>(·8·)</strong>');
                            $('#alert').show();
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
            $('#message').html('用户名不能为空<strong>(·8·)</strong>');
            $('#alert').show();
        } else if (v_token == '') {
            $('#message').html('Token不能为空<strong>(·8·)</strong>');
            $('#alert').show();
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

                        } else {
                            $('#message').html(
                                '未知错误<strong>(·8·)</strong>');
                            $('#alert').show();
                        }
                    }
                }
            });
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
                $('#message').html('未知错误<strong>(·8·)</strong>');
                $('#alert').show();
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

                            } else {
                                // add more sources here
                            }
                        }
                    }
                } else {
                    $('#alert').show();
                }
            }
        });

    });
});