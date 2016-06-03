/**
 * Created by huangruihao on 16-5-25.
 */
'use strict';
$(document).ready(function(){
    $('#login').submit(function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        $.get('js/config.json', function(data){
            var params = 'username=' + username + '&' + 'password=' + password;
            $.ajax({
                type: 'POST',
                url: data['auth']['host'] + ':' + data['auth']['port'] + '/api/v1/login?' + params,
                success: function (response) {
                    response = JSON.parse(response);
                    if (response['status'] == 'ok') {
                        var token = response['token'];
                        window.location.replace(data['client']['host'] + ':' + data['client']['port'] + '/home/' + token);
                    } else {
                        console.log(response['reason']);
                        if (response['reason'] == 'wrong password') {
                            $('#message').html('密码错误<strong>(·8·)</strong>');
                        } else if (response['reason'] == 'user not found') {
                            $('#message').html('不存在这个用户<strong>(·8·)</strong>');
                        } else {
                            $('#message').html('未知错误<strong>(·8·)</strong>');
                        }
                        $('#alert').show();
                    }
                }
            });
        });
    });
    $('#register').click(function(){
        var username = $('#username').val();
        var password = $('#password').val();
        var confirm = $('#confirm').val();
        if (username == '' && password == '' && confirm == ''){
            // just collapsed
        } else if (username != '' && password != '' && confirm != '' && password == confirm){
            $.get('js/config.json', function(data){
                var params = 'username=' + username + '&' + 'password=' + password;
                $.ajax({
                    type: 'POST',
                    url: data['auth']['host'] + ':' + data['auth']['port'] + '/api/v1/register?' + params,
                    success: function (response) {
                        response = JSON.parse(response);
                        if (response['status'] == 'ok') {
                            var token = response['token'];
                            window.location.replace(data['client']['host'] + ':' + data['client']['port'] + '/home/' + token);
                        } else if (response['reason'] == 'user already exist') {
                            $('#message').html('用户已存在<strong>(·8·)</strong>');
                            $('#alert').show();
                        } else {
                            $('#message').html('未知错误<strong>(·8·)</strong>');
                            $('#alert').show();
                        }
                    }
                });
            });
        } else if (username == '') {
            $('#message').html('用户名不能为空<strong>(·8·)</strong>');
            $('#alert').show();
        } else if (password == '') {
            $('#message').html('密码不能为空<strong>(·8·)</strong>');
            $('#alert').show();
        } else if (password != confirm) {
            $('#message').html('密码输入不一致<strong>(·8·)</strong>');
            $('#alert').show();
        }
    });
});