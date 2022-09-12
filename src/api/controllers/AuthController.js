const { SECRET_KEY, ONE_DAY, JWT_KEY, NULL_DURATION, EMPTY_STRING } = require("../../config/constants");
const jwt = require('jsonwebtoken');

module.exports.signin = (req, res, next, conn) => {
    const { Name, Email__c, Status__c, Password__c } = { Name: "tiemeni hapi", Email__c: "tiemanirocket@gmail.com", Password__c: "hsjdjsdjsdjsdj541545" };
    conn.search("FIND {" + Name + "*} IN ALL FIELDS RETURNING Compte__c(Id, Name, Password__c)",
        function (err, result) {
            if (err) {
                res.cookie(JWT_KEY, EMPTY_STRING, { maxAge: NULL_DURATION });
                res.status(400).json({ success: false });
            } else {
                if (result.searchRecords[0].Password__c == Password__c) {
                    const id = result.searchRecords[0].Id;
                    const token = jwt.sign({ id }, SECRET_KEY, {
                        expiresIn: ONE_DAY,
                    });
                    res.cookie(JWT_KEY, token, { maxAge: ONE_DAY });
                    res.status(201).json({ success: true });
                } else {
                    res.cookie(JWT_KEY, EMPTY_STRING, { maxAge: NULL_DURATION });
                    res.status(400).json({ success: false });
                }
            }
            next()
        }
    );
}

module.exports.signup = (req, res, next, conn) => {
    const { Name, Email__c, Status__c, Password__c } = { Name: "leugoue hapi", Email__c: "leugouemichelle@gmail.com", Password__c: "shsjdjsdjsdjsdj541545" };

    conn.sobject("Compte__c")
        .find({ Email__c: Email__c })
        .execute(
            (err, result) => {
                if (err) {
                    res.cookie(JWT_KEY, EMPTY_STRING, { maxAge: NULL_DURATION });
                    res.status(400).json({ success: false });
                    next();
                } else {
                    if (Array.from(result).length > 0) {
                        const id = result[0].Id;
                        const token = jwt.sign({ id }, SECRET_KEY, {
                            expiresIn: ONE_DAY,
                        });
                        res.cookie(JWT_KEY, token, { maxAge: ONE_DAY });
                        res.status(201).json({ success: false, data: "vous avez deja un compte" });
                        next();
                    } else {
                        conn.sobject("Compte__c").create({ Name, Email__c, Status__c, Password__c }, function (err, ret) {
                            if (err || !ret.success) {
                                res.cookie(JWT_KEY, EMPTY_STRING, { maxAge: NULL_DURATION });
                                res.status(400).json({ success: false });
                            } else {
                                const id = ret.id;
                                const token = jwt.sign({ id }, SECRET_KEY, {
                                    expiresIn: ONE_DAY,
                                });
                                res.cookie(JWT_KEY, token, { maxAge: ONE_DAY });
                                res.status(200).json({ success: ret.success, data: ret.id });
                            }
                        });
                    }
                }
            }
        )




}