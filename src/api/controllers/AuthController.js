const {
    SECRET_KEY,
    ONE_DAY,
    JWT_KEY,
    NULL_DURATION,
    EMPTY_STRING,
    COMPTE,
    ALREADY_AN_ACCOUNT_MESSAGE
} = require("../../config/constants");

const jwt = require('jsonwebtoken');

module.exports.signin = (req, res, next, conn) => {

    const { Name, Email__c, Status__c, Password__c } = { Name: "doudieu hapi", Email__c: "tiemanirocket@gmail.com", Password__c: "shsjdjsdjsdjsdj541545" };
    conn.sobject(COMPTE)
        .find({ Email__c: Email__c })
        .execute(
            function (err, result) {
                if (err) {
                    res.cookie(JWT_KEY, EMPTY_STRING, { maxAge: NULL_DURATION });
                    res.status(400).json({ success: false });
                } else {
                    if (Array.from(result).length > 0) {
                        if (result[0].Password__c == Password__c) {
                            const id = result[0].Id;
                            const token = jwt.sign({ id }, SECRET_KEY, {
                                expiresIn: ONE_DAY,
                            });
                            res.cookie(JWT_KEY, token, { maxAge: ONE_DAY });
                            res.status(201).json({ success: true });
                        }
                    } else {
                        res.cookie(JWT_KEY, EMPTY_STRING, { maxAge: NULL_DURATION });
                        res.status(400).json({ success: false });
                    }
                }
            }
        );
}

module.exports.signup = (req, res, next, conn) => {

    const { Name, Email__c, Status__c, Password__c } = { Name: "yopa tankoua", Email__c: "yopa@gmail.com", Password__c: "shsjdjsdjsdjsdj541545" };
    conn.sobject(COMPTE)
        .find({ Email__c: Email__c })
        .execute(
            (err, result) => {
                if (err) {
                    res.cookie(JWT_KEY, EMPTY_STRING, { maxAge: NULL_DURATION });
                    res.status(400).json({ success: false });
                } else {
                    if (Array.from(result).length > 0) {
                        const id = result[0].Id;
                        const token = jwt.sign({ id }, SECRET_KEY, {
                            expiresIn: ONE_DAY,
                        });
                        res.cookie(JWT_KEY, token, { maxAge: ONE_DAY });
                        res.status(201).json({ success: false, data: ALREADY_AN_ACCOUNT_MESSAGE });
                    } else {
                        conn.sobject(COMPTE).create({ Name, Email__c, Status__c, Password__c }, function (err, ret) {
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