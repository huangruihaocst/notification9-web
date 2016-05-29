/**
 * Created by huangruihao on 16-5-25.
 */
'use strict';
$(document).ready(function(){
    $('#login_form').submit(function(e){
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
                    var token = JSON.parse(response)['token'];
                    window.location.replace('http://' + host + ':' + client_port + '/home/' + token);
                }
            });
        });
    });
});