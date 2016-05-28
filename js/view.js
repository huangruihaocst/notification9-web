/**
 * Created by huangruihao on 16-5-25.
 */
'use strict';
$(document).ready(function(){
    $('#login_form').submit(function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        var host, auth_port;
        $.get('js/config.json', function(data){
            host = data['host'];
            auth_port = data['auth_port'];
            var params = 'username=' + username + '&' + 'password=' + password;
            $.ajax({
                type: 'POST',
                url: 'http://' + host + ':' + auth_port + '/api/v1/login?' + params,
                success: function (data) {
                    var token = JSON.parse(data)['token'];
                    document.body.innerHTML = '';
                    document.load('notifications.html');
                }
            });
        });
    });
});