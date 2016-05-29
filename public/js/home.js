/**
 * Created by huangruihao on 16-5-29.
 */
'use strict';
$(document).ready(function (){
    var token = $('#token').text();
    $.get('../js/config.json', function(data1){
        var host = data1['host'];
        var auth_port = data1['auth_port'];
        $.ajax({
            type: 'GET',
            url: 'http://' + host + ':' + auth_port + '/api/v1/user_info?token=' + token,
            success: function (response) {
                response = JSON.parse(response);
                $('#username').text(response['username']);
                $('#user_id').text(response['user_id']);
            }
        });
    });
});