/**
 * Created by huangruihao on 16-5-29.
 */
$(document).ready(function(){
    var token = $('#token').text();
    $.get('../js/config.json', function(data){
        var host = data['host'];
        var auth_port = data['auth_port'];
        var scheduler_port = data['scheduler_port'];
        var client_port = data['client_port'];
        $.ajax({
            type: 'GET',
            url: 'http://' + host + ':' + scheduler_port + '/api/v1/all_sources?token=' + token,
            success: function(response) {
                response = JSON.parse(response);
                if (response['status'] == 'ok') {
                    var sources = response['sources']; // dict
                    for (var key in sources) {
                        if (key == 'github' && sources.hasOwnProperty(key)) {
                            $.ajax({
                                type: 'GET',
                                url: sources[key] + '/api/v1/check_registered',
                                success: function (result) {
                                    result = JSON.parse(result);
                                    if (result['status'] == 'ok') {
                                         
                                    } else {
                                        $('#alert').show();
                                    }
                                }
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