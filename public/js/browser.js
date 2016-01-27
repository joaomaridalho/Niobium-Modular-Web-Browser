var $ = require('jquery');
$('#navbar').keyup(function (e) {
    if (e.keyCode == 13) {
        var url = $("#navbar").val();
        $('.vistativa').attr('src', url);
    }
});
