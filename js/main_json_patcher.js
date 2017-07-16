/**
 * Created by qperez on 14/07/17.
 */
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

    var $textarea_json_object_result = $("#textarea-json-object-result");

    var $button_create_patch = $("#btn-create-patch");
    var $button_reset        = $("#btn-reset");

    var validatorJSON_1 = new ValidatorJSON();
    var validatorJSON_2 = new ValidatorJSON();

    handleTabTextArea($textarea_json_object_1);
    $textarea_json_object_1.on('input change', function(){

        validatorJSON_1.validateJSON($textarea_json_object_1.val());
        console.log(validatorJSON_1);
        if(!validatorJSON_1.isValidJSON() && $textarea_json_object_1.val().length > 0){
            console.log("not valide")
            $("#form-control-feedback-1").remove();
            $("#form-text-1").remove();

            $form_group_textarea_1.addClass("has-danger");
            $form_group_textarea_1
                .append(
                    "<div class='form-control-feedback' id='form-control-feedback-1'>" +
                        "Sorry, the JSON object is invalid. Keep calm and try again." +
                    "</div>" +
                    "<small class='form-text text-muted' id='form-text-1'>" +
                        validatorJSON_1.getStringError() +
                    "</small>"
                );
        }else{
            $form_group_textarea_1.removeClass("has-danger");
            $("#form-control-feedback-1").remove();
            $("#form-text-1").remove();
        }
    });

    handleTabTextArea($textarea_json_object_1);
    $textarea_json_object_2.on('input change', function(){

        validatorJSON_2.validateJSON($textarea_json_object_2.val());
        if(!validatorJSON_2.isValidJSON() && $textarea_json_object_2.val().length > 0){
            $("#form-control-feedback-2").remove();
            $("#form-text-2").remove();

            $form_group_textarea_2.addClass("has-danger");
            $form_group_textarea_2
                .append(
                    "<div class='form-control-feedback' id='form-control-feedback-2'>" +
                        "Sorry, the JSON object is invalid. Keep calm and try again." +
                    "</div>" +
                    "<small class='form-text text-muted' id='form-text-2'>" +
                        validatorJSON_2.getStringError() +
                    "</small>"
            );
        }else{
            $form_group_textarea_2.removeClass("has-danger");
            $("#form-control-feedback-2").remove();
            $("#form-text-2").remove();
        }
    });

    $button_create_patch.on('click', function () {
        if(validatorJSON_1.isValidJSON() && validatorJSON_2.isValidJSON()){
            var json_patch_diff = jsonpatch.compare(JSON.parse($.trim($textarea_json_object_1.val())),
                JSON.parse($.trim($textarea_json_object_2.val())));
            $textarea_json_object_result.val(JSON.stringify(json_patch_diff));
            console.log(new ValidatorJSON().validateJSON(JSON.stringify(json_patch_diff)));
        }
    });
    
    $button_reset.on('click', function () {
        $textarea_json_object_1.val("");
        $textarea_json_object_2.val("");
        $textarea_json_object_result.val("");
        $textarea_json_object_1.trigger("change");
        $textarea_json_object_2.trigger("change");
    });
});
