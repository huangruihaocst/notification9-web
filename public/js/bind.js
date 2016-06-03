/**
 * Created by huangruihao on 16-5-29.
 */
$(document).ready(function(){
    var token = $('#token').text();
    $.get('../js/config.json', function(data){
        $.ajax({
            type: 'GET',
            url: data['scheduler']['host'] + ':' + data['scheduler']['port'] + '/api/v1/all_sources?token=' + token,
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