/**
 * Created by huangruihao on 16-5-29.
 */
'use strict';
$(document).ready(function (){
    var token = $('#token').text();
    $.get('../js/config.json', function(data){
        var host = data['host'];
        var auth_port = data['auth_port'];
        var scheduler_port = data['scheduler_port'];
        $.ajax({
            type: 'GET',
            url: 'http://' + host + ':' + auth_port + '/api/v1/user_info?token=' + token,
            success: function (response) {
                response = JSON.parse(response);
                var username = response['username'];
                var user_id = response['user_id'];
                $('#username').text(username);
                $('#user_id').text(user_id);
                $.ajax({
                    type: 'GET',
                    url: 'http://' + host + ':' + scheduler_port + '/api/v1/unread_messages?user_id=' + user_id
                    + '&token=' + token,
                    success: function (messages) {
                        messages = JSON.parse(messages)['simple_messages']; // array
                        for(var i = 0;i < messages.length; ++i){
                            var title = messages[i]['title'];
                            var url = messages[i]['url'];
                            var html = '<li><a href="' + url +'">' + title + '</a></li>';
                            $('#notifications_list').append(html);
                        }
                    }
                });
            }
        });

    });
});