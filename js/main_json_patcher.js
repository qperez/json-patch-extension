function handleTabTextArea($textarea){
    $textarea.keydown(function(e) {
        if(e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var $this = $(this);
            var value = $this.val();

            // set textarea value to: text before caret + tab + text after caret
            $this.val(value.substring(0, start)
                + "\t"
                + value.substring(end));

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            e.preventDefault();
        }
    });
}

$(document).ready(function(){
    var $textarea_json_object_1 = $("#textarea-json-object-1");
    var $form_group_textarea_1  = $("#form-group-textarea-1");

    var $textarea_json_object_2 = $("#textarea-json-object-2");
    var $form_group_textarea_2  = $("#form-group-textarea-2");

    var $textarea_json_object_validate       = $("#textarea-json-object-validate");
    var $form_group_textarea_object_validate = $("#form-group-textarea-object-validate");

    var $textarea_json_patch_validate        = $("#textarea-json-patch-validate");
    var $form_group_textarea_patch_validate  = $("#form-group-textarea-patch-validate");

    var $textarea_json_object_result = $("#textarea-json-object-result");

    var $button_create_patch   = $("#btn-create-diff");
    var $button_reset          = $("#btn-reset-diff");
    var $button_validate       = $("#btn-validate");
    var $button_reset_validate = $("#btn-reset-validate");

    var $checkbox_expand_empty = $("#checkbox-expand-empty");

    var validatorJSON_diff_1 = new ValidatorJSON();
    var validatorJSON_diff_2 = new ValidatorJSON();
    var validatorJSON_validate_1 = new ValidatorJSON();
    var validatorJSON_validate_2 = new ValidatorJSON();

    handleTabTextArea($textarea_json_object_1);
    $textarea_json_object_1.on('input change', function(){

        validatorJSON_diff_1.validateJSON($textarea_json_object_1.val());
        if(!validatorJSON_diff_1.isValidJSON() && $textarea_json_object_1.val().length > 0){
            $("#form-control-feedback-1").remove();
            $("#form-text-1").remove();

            $textarea_json_object_1.addClass("form-control-danger");
            $form_group_textarea_1.addClass("has-danger");
            $form_group_textarea_1
                .append(
                    "<div class='form-control-feedback' id='form-control-feedback-1'>" +
                    "Sorry, the JSON object is invalid. Keep calm and try again." +
                    "</div>" +
                    "<small class='form-text text-muted' id='form-text-1'>" +
                    validatorJSON_diff_1.getStringError() +
                    "</small>"
                );
        }else{
            $textarea_json_object_1.removeClass("form-control-danger form-control-warning");
            $form_group_textarea_1.removeClass("has-danger has-warning");
            $("#form-control-feedback-1").remove();
            $("#form-text-1").remove();
        }
    });

    handleTabTextArea($textarea_json_object_1);
    $textarea_json_object_2.on('input change', function(){

        validatorJSON_diff_2.validateJSON($textarea_json_object_2.val());
        if(!validatorJSON_diff_2.isValidJSON() && $textarea_json_object_2.val().length > 0){
            $("#form-control-feedback-2").remove();
            $("#form-text-2").remove();

            $textarea_json_object_2.addClass("form-control-danger");
            $form_group_textarea_2.addClass("has-danger");
            $form_group_textarea_2
                .append(
                    "<div class='form-control-feedback' id='form-control-feedback-2'>" +
                    "Sorry, the JSON object is invalid. Keep calm and try again." +
                    "</div>" +
                    "<small class='form-text text-muted' id='form-text-2'>" +
                    validatorJSON_diff_2.getStringError() +
                    "</small>"
                );
        }else{
            $textarea_json_object_2.removeClass("form-control-danger form-control-warning");
            $form_group_textarea_2.removeClass("has-danger has-warning");
            $("#form-control-feedback-2").remove();
            $("#form-text-2").remove();
        }
    });

    $button_create_patch.on('click', function () {

        if(validatorJSON_diff_1.isValidJSON() && validatorJSON_diff_2.isValidJSON()){

            var json_patch_diff = null;
            var json_object_1   = JSON.parse($.trim($textarea_json_object_1.val()));
            var json_object_2   = JSON.parse($.trim($textarea_json_object_2.val()));

            if($checkbox_expand_empty.is(":checked")){

                $textarea_json_object_2.removeClass("form-control-warning");
                $form_group_textarea_2.removeClass("has-warning");
                $("#form-control-feedback-2").remove();
                $("#form-text-2").remove();

                $textarea_json_object_1.removeClass("form-control-warning");
                $form_group_textarea_1.removeClass("has-warning");
                $("#form-control-feedback-1").remove();
                $("#form-text-1").remove();

                if(!json_object_1.hasOwnProperty("@context")){
                    $("#form-control-feedback-1").remove();
                    $("#form-text-1").remove();

                    $textarea_json_object_1.addClass("form-control-warning");
                    $form_group_textarea_1.addClass("has-warning");
                    $form_group_textarea_1
                        .append(
                            "<div class='form-control-feedback' id='form-control-feedback-1'>" +
                            "Sorry, context missing. Keep calm and add context." +
                            "</div>" +
                            "<small class='form-text text-muted' id='form-text-1'>" +
                            'A context must be be specified when we use option "compact (with empty context)."' +
                            "</small>"
                         );
                }else if(!json_object_2.hasOwnProperty("@context")){
                    $("#form-control-feedback-2").remove();
                    $("#form-text-2").remove();

                    $textarea_json_object_2.addClass("form-control-warning");
                    $form_group_textarea_2.addClass("has-warning");
                    $form_group_textarea_2
                        .append(
                            "<div class='form-control-feedback' id='form-control-feedback-2'>" +
                            "Sorry, context missing. Keep calm and add context." +
                            "</div>" +
                            "<small class='form-text text-muted' id='form-text-2'>" +
                            'A context must be be specified when we use option "compact (with empty context)."' +
                            "</small>"
                        );
                }else{
                    var promises = jsonld.promises;
                    var array_compacted_objects = [];
                    var promise1 = promises.compact(json_object_1, {});
                    promise1.then(function (result) {
                        array_compacted_objects.push(result);
                        return promises.compact(json_object_2, {});
                    }).then(function (result) {
                        array_compacted_objects.push(result);
                        json_patch_diff = jsonpatch.compare(array_compacted_objects[0],array_compacted_objects[1]);
                        $textarea_json_object_result.val(JSON.stringify(json_patch_diff));
                    });
                }

            }else{
                json_patch_diff = jsonpatch.compare(json_object_1, json_object_2);
                $textarea_json_object_result.val(JSON.stringify(json_patch_diff));
            }
        }
    });

    $button_reset.on('click', function () {
        $textarea_json_object_1.val("");
        $textarea_json_object_2.val("");
        $textarea_json_object_result.val("");
        $textarea_json_object_1.trigger("change");
        $textarea_json_object_2.trigger("change");
    });

    handleTabTextArea($textarea_json_object_validate);
    $textarea_json_object_validate.on('input change', function(){
        validatorJSON_validate_1.validateJSON($textarea_json_object_validate.val());
        if(!validatorJSON_validate_1.isValidJSON() && $textarea_json_object_validate.val().length > 0){
            $("#form-control-feedback-patch-object").remove();
            $("#form-text-patch-object").remove();

            $textarea_json_object_validate.addClass("form-control-danger");
            $form_group_textarea_object_validate.addClass("has-danger");
            $form_group_textarea_object_validate
                .append(
                    "<div class='form-control-feedback' id='form-control-feedback-patch-object'>" +
                    "Sorry, the JSON object is invalid. Keep calm and try again." +
                    "</div>" +
                    "<small class='form-text text-muted' id='form-text-patch-object'>" +
                    validatorJSON_validate_1.getStringError() +
                    "</small>"
                );
        }else{
            $textarea_json_object_validate.removeClass("form-control-danger");
            $form_group_textarea_object_validate.removeClass("has-danger");
            $("#form-control-feedback-patch-object").remove();
            $("#form-text-patch-object").remove();
        }
    });

    $textarea_json_patch_validate.on('input change', function(){
        validatorJSON_validate_2.validateJSON($textarea_json_patch_validate.val());
        if(!validatorJSON_validate_2.isValidJSON() && $textarea_json_patch_validate.val().length > 0){
            $("#form-control-feedback-patch-validate").remove();
            $("#form-text-patch-validate").remove();

            $textarea_json_patch_validate.addClass("form-control-danger");
            $form_group_textarea_patch_validate.addClass("has-danger");
            $form_group_textarea_patch_validate
                .append(
                    "<div class='form-control-feedback' id='form-control-feedback-patch-validate'>" +
                    "Sorry, the JSON object is invalid. Keep calm and try again." +
                    "</div>" +
                    "<small class='form-text text-muted' id='form-text-patch-validate'>" +
                    validatorJSON_validate_2.getStringError() +
                    "</small>"
                );
        }else{
            $textarea_json_object_validate.removeClass("form-control-danger");
            $form_group_textarea_object_validate.removeClass("has-danger");
            $("#form-control-feedback-patch-validate").remove();
            $("#form-text-patch-validate").remove();
        }
    });

    $button_validate.on('click', function () {

        if(validatorJSON_validate_1.isValidJSON() && validatorJSON_validate_2.isValidJSON()){
            var error = jsonpatch.validate(
                JSON.parse($.trim($textarea_json_patch_validate.val())),
                JSON.parse($.trim($textarea_json_object_validate.val()))
            );
            console.log(error);
            if (typeof error === 'undefined' || error === null) {
                console.log("no err");
                //there are no errors!
                $("#form-control-feedback-patch-validate-result").remove();
                $("#form-text-patch-validate-result").remove();
                $textarea_json_patch_validate.removeClass("form-control-danger");
                $textarea_json_patch_validate.addClass("form-control-success");
                $form_group_textarea_patch_validate.removeClass("has-danger");
                $form_group_textarea_patch_validate.addClass("has-success");

            }
            else {
                $("#form-control-feedback-patch-validate-result").remove();
                $("#form-text-patch-validate-result").remove();
                $textarea_json_patch_validate.removeClass("form-control-success");
                $textarea_json_patch_validate.addClass("form-control-danger");
                $form_group_textarea_patch_validate.removeClass("has-success");
                $form_group_textarea_patch_validate.addClass("has-danger");
                $form_group_textarea_patch_validate
                    .append(
                        "<div class='form-control-feedback' id='form-control-feedback-patch-validate-result'>" +
                        error.name +
                        "</div>" +
                        "<small class='form-text text-muted' id='form-text-patch-validate-result'>" +
                        error.message +
                        "</small>"
                    );
            }
        }
    });

    $button_reset_validate.on('click', function () {
        $textarea_json_patch_validate.val("");
        $textarea_json_object_validate.val("");
        $textarea_json_patch_validate.trigger("change");
        $textarea_json_object_validate.trigger("change");
    });
});
