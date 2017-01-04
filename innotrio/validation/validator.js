/**
 * Created by g.konnov on 31.12.2016.
 */

const validator = require('validator'),
    ResultError = require('../error');

module.exports = class Validator {
    /**
     * Проверяет, что значение - целое число. undefined не принимает.
     */
    static isInt(value) {
        if (!isNaN(value) && validator.isInt(value)) {
            return value;
        } else {
            throw new ResultError('VALIDATION_NOT_INT', 400, value);
        }
    }

    /**
     * Эскейпит строку. Не проверяет наличие.
     */
    static escape(value) {
        return validator.escape(value || '');
    }

    /**
     * Проверяет, что значение - строка, эскейпит, тримит. undefined вызовет ошибку.
     */
    static isString(value) {
        value = value || '';
        value = value.trim();

        if (value.length > 0) {
            return Validator.escape(value);
        } else {
            throw new ResultError('VALIDATION_NO_STRING', 400, value);
        }
    }

    /**
     * Проверяет, что передан email + lowercase+trim+escape
     */
    static isEmail(value) {
        let email = Validator.isString(value).toLowerCase();

        if (validator.isEmail(email)) {
            return email;
        } else {
            throw new ResultError('VALIDATION_NOT_EMAIL', 400, value);
        }
    }


};


/*
 func IsInt(item string) (int) {
 num, err := strconv.Atoi(item)
 checkError(err, "VALIDATION_NOT_INT")
 return num
 }

 func IsCode(item string) (string) {
 isOk, err := regexp.MatchString("^[a-zA-Z0-9_]+$", item)
 checkError(err, "VALIDATION_CODE_REGEXP")

 if (isOk) {
 return item
 }
 sendErrorByCode("VALIDATION_NOT_CODE")
 return ""
 }

 func IsValidStrArr(items []string, validateFunc StringValidator, required bool) []string {
 if (items == nil) {
 if (required){
 sendErrorByCode("NO_VALID_STR_ARR")
 return nil
 }else{
 return make([]string, 0)
 }

 }
 results := make([]string, len(items))
 for i, item := range items {
 results[i] = validateFunc(item)
 }
 return results
 }


 func checkError(err error, errCode string) {
 if err != nil {
 panic(safeerror.New(err, errCode))
 }
 }

 func sendErrorByCode(errCode string) {
 panic(safeerror.NewByCode(errCode))
 }
 */