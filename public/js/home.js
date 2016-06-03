/**
 * Created by huangruihao on 16-5-29.
 */
'use strict';
$(document).ready(function (){
    var token = $('#token').text();
    $.get('../js/config.json', function(data){
        $.ajax({
            type: 'GET',
            url: data['auth']['host'] + ':' + data['auth']['port'] + '/api/v1/user_info?token=' + token,
            success: function (response) {
                response = JSON.parse(response);
                var username = response['username'];
                var user_id = response['user_id'];
                $('#username').text(username);
                $('#user_id').text(user_id);
                $.ajax({
                    type: 'GET',
                    url: data['scheduler']['host'] + ':' + data['scheduler']['port'] + '/api/v1/unread_messages?user_id=' + user_id
                    + '&token=' + token,
                    success: function (messages) {
                        messages = JSON.parse(messages)['simple_messages']; // array
                        for(var i = 0;i < messages.length; ++i){
                            var title = messages[i]['title'];
                            var url = messages[i]['url'];
                            var source = '来源：' + messages[i]['source'];
                            var html = '<li><div class="row"><div><a href="' + url +'" class="col-md-3" target="_blank">'
                                + title + '</a></div>' + '<div class="col-md-2"></div><p class="text-info col-md-2">'
                                + source + '</p>' + '</div></li>';
                            $('#notifications_list').append(html);
                        }
                    }
                });
            }
        });
        $('#bind').attr('href', data['client']['host'] + ':' + data['client']['port'] + '/bind/' + token);
    });
});
