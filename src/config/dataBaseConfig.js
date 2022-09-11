const { SL_LOGIN_URL, SF_TOKEN, SF_USERNAME, SF_PASSWORD } = require("./constants");

class EstablishConnexion {

    SL_LOGIN_URL = SL_LOGIN_URL
    SF_TOKEN = SF_TOKEN
    SF_USERNAME = SF_USERNAME
    SF_PASSWORD = SF_PASSWORD

    setConnexion = (conn) => {
        return new Promise((resolve, reject) => {
            conn.login(this.SF_USERNAME, this.SF_PASSWORD + this.SF_TOKEN, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            })
        })
    }
}

module.exports = { EstablishConnexion };

