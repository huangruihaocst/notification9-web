/**
 * Created by huangruihao on 16-5-29.
 */
$(document).ready(function(){
    var token = $('#token').text();
    $('#learn_dialog').dialog({
        autoOpen: false,
        buttons: {
            确定: function () {
                var username = $('#username').val();
                var password = $('#password').val();
                $.ajax({
                    
                });
                $(this).dialog('close');
            },
            取消: function () {
                $(this).dialog('close');
            }
        }
    });
    $('#learn').click(function () {
        $('#learn_dialog').dialog('open');
    });
});