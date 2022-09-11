
module.exports.getAllProducts = (req, res, next, conn) => {
    conn.query("SELECT Image__c, Description__c, Image_url__c, Name__c, Price__c FROM Produit__c", (err, data) => {
        if (err) {
            res.status(400).json({ err: err })
        } else {
            res.status(200).json({ data: data })
        }
        next();
    })
}