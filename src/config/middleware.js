module.exports = {
    checkDataLogin: (data) => {
        let domain = /\.(com|id|gov|co.id|sch.id|my.id)/
        if (data.includes('@') && data.match(domain)) {
            return { email: data };
        } else if (!isNaN(data)) {
            return { phone: data };
        } else {
            return { username: data };
        }
    }
}