const crypto = require('crypto');

module.exports = {
    cryptoPwd(pwd) {
        let md5 = crypto.createHash('md5');
        md5.update(pwd);
        const cryPwd = md5.digest('hex');
        return cryPwd;
    },
    formateDate(numStamp, symbol) {
        let y, m, d, h, min;
        let sym = !symbol ? '-' : symbol;
        if(numStamp == 0) {
            y = new Date().getFullYear()
            m = new Date().getMonth() + 1
            d = new Date().getDate()
            h = new Date().getHours()
            min = new Date().getMinutes()
        }
        else {
            y = new Date(numStamp).getFullYear()
            m = new Date(numStamp).getMonth() + 1
            d = new Date(numStamp).getDate()
            h = new Date(numStamp).getHours()
            min = new Date(numStamp).getMinutes() 
        }
        m = m.toString().length == 1 ? '0' + m : m
        d = d.toString().length == 1 ? '0' + d : d
        h = h.toString().length == 1 ? '0' + h : h
        min = min.toString().length == 1 ? '0' + min : min
        let dateString = y + sym + m + sym + d + ' ' + h + ':' + min
        return dateString
    }
}