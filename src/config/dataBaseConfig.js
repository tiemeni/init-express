
class EstablishConnexion {

    SL_LOGIN_URL = "https://login.salesforce.com"
    SF_TOKEN = "JAhorxWy5ajdSULgUZJUTpvxd";
    SF_USERNAME = "tiemenihapi@hapidev.com";
    SF_PASSWORD = "Masochisme18";

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

