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
            var host = data['host'];
            var auth_port = data['auth_port'];
            var client_port = data['client_port'];
            var params = 'username=' + username + '&' + 'password=' + password;
            $.ajax({
                type: 'POST',
                url: 'http://' + host + ':' + auth_port + '/api/v1/login?' + params,
                success: function (response) {
                    response = JSON.parse(response)
                    if(response['status'] == 'ok') {
                        var token = response['token'];
                        console.log(token);
                        window.location.replace('http://' + host + ':' + client_port + '/home/' + token);
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
        $.get('js/config.json', function(data){
            var host = data['host'];
            var auth_port = data['auth_port'];
            var client_port = data['client_port'];
            var params = 'username=' + username + '&' + 'password=' + password;
            $.ajax({
                type: 'POST',
                url: 'http://' + host + ':' + auth_port + '/api/v1/register?' + params,
                success: function (response) {
                    var token = JSON.parse(response)['token'];
                    window.location.replace('http://' + host + ':' + client_port + '/home/' + token);
                }
            });
        });
    });
});