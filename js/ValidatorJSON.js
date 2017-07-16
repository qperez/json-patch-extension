/**
 * Created by qperez on 14/07/17.
 */
var ValidatorJSON = function(){
    this._jsonValid = false;
    this._stringError  = null;
};

ValidatorJSON.prototype.validateJSON = function (JSONToValid) {
    try {
        JSON.parse(JSONToValid);
        this._jsonValid = true;
        this._stringError  = null;
        return true;
    } catch (e) {
        this._jsonValid = false;
        this._stringError = e.toString();
        return false;
    }
};

ValidatorJSON.prototype.isValidJSON = function () {
    return this._jsonValid;
};

ValidatorJSON.prototype.getStringError = function () {
    return this._stringError;
};
