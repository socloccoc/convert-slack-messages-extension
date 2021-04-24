$(document).ready(function () {
    $("#convert").validate({
        rules: {
            sheet_id: {
                required: true
            },
            body: {
                required: true
            }
        },

        messages: {
            sheet_id: {
                required: 'SheetId is required!'
            },
            body: {
                required: 'Body is required!'
            }
        }
    });

    if ($('#convert').valid()) {
        $('#btn-convert').prop('disabled', false);
    } else {
        $('#btn-convert').prop('disabled', 'disabled');
    }

    $('#convert .input').on('keyup blur', function () {
        if ($('#convert').valid()) {
            $('#btn-convert').prop('disabled', false);
        } else {
            $('#btn-convert').prop('disabled', 'disabled');
        }
    });
});