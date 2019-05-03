$(document).ready(function () {

    var base = 'AJAX'; //define folder where ajax live
    var initial_msg = '<span>Поле для ввода</span>';
    var error_msg = '<span class="text-danger">Неправильный формат</span>';
    var success_msg = '<span class="text-success">Успешно переведено</span>';

    //action on button "clear"
    $('#doEmpty').on("click", function () {
        $('#input textarea, #output textarea').val('');
        $('#system-numeric').empty();
    })

    //action when cursor pointer has left textarea
    $('#input textarea').blur(function () {
        $('#input label').html(initial_msg);
    })

    //do exchange
    $('#doExchange').on("click", function () {
        var input_1 = $.trim($('#input textarea').val());
        var input_2 = $.trim($('#output textarea').val());

        if (!$(input_1).is(':empty') || !$(input_2).is(':empty')) {
            $('#input textarea').val(input_2);
            $('#output textarea').val(input_1);
        }
    })
    //action on button "translate"
    $('#doConvert').on("click", function () {
        var input = $.trim($('#input textarea').val());
        var array_response=validation(input);
        if (input.length>0 && !array_response['status']) {
            $('#input label').html(error_msg);
        } else {
            sendRequest(input,array_response['lang']);
            $('#input label').html(initial_msg);
        }
    })

    //action when focused or typing is going on textarea
    $('#input textarea').on('focus keyup', function () {
        var input = $.trim($(this).val());
        var array_response = validation(input);
        console.log(input.length);
        if (input.length > 0 && !array_response['status']) {
            $('#input label').html(error_msg);
        } else {
            sendRequest(input, array_response['lang']);
            $('#input label').html(initial_msg);
        }
    })

    //action when user press ENTER
    $('#input textarea').on('keypress', function (event) {
        var input = $.trim($(this).val());
        var array_response = validation(input);
        if (event.which == 13) {
            event.preventDefault();
            if (input.length > 0 && !array_response['status']) {
                $('#input label').html(error_msg);
            } else {
                sendRequest(input, array_response['lang']);
                $('#input label').html(initial_msg);
            }
        }
    })


    /*********************************FUNCTION SECTION*************************************/
    function validation(raw_input) {
        var ok = false;
        var lang = '';
        switch ($.isNumeric(raw_input)) {
            case true:
                ok = true;
                lang = 'latin';
                break;
            case false:
                lang = 'roman';
                if (!/(I|V|X|L|C|D|M)\1{3,}/gi.test(raw_input)) { //avoid three time repeated letter
                    for (var i = 0; i < raw_input.length; i++) {
                        if (raw_input[i].match(/I|V|X|L|C|D|M/gi)) { //avoid non-latin expression
                            ok = true;
                        } else {
                            ok = false;
                            break; //break if any non-latin letter was met
                        }
                    }
                }
                break;
        }
        return {'status': ok, 'lang': lang};
    }

    function sendRequest(raw_input, array_response) {
        if (!$(raw_input).is(':empty') && !$(array_response).is(':empty')) {
            $.post(base + "/Calculator.php", {num_lang: array_response, body: raw_input})
                .done(function (data) {
                    var done=validation(data);
                        if(done['status']){
                        $numeric_system = (array_response == 'latin') ? '<p>Латинская (римская) система счисления </p>' : '<p>Арабская система счисления </p>';
                        $('#output textarea').val(data);
                        $('#system-numeric').html($numeric_system);
                        $('#input label').html(success_msg);
                        $(".result").html(data);
                        }
                });
        } else {
            $('#input label').html(error_msg);
        }
    }
})