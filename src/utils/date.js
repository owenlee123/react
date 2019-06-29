/*
 ***  日期格式化
 **   
 */
export function dateFormat(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}