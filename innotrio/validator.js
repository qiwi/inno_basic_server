/**
 * Created by g.konnov on 31.12.2016.
 */

module.exports = class Validator {

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

 func Escape(item string) (string) {
 return html.EscapeString(item)
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