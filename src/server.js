const { GET_ALL_PRODUCTS, ELSLY_PORT, DOT_ENV_PATH } = require("./config/constants");
const express = require("express");
const jsforce = require('jsforce')
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, DOT_ENV_PATH),
});
const { EstablishConnexion } = require("./config/dataBaseConfig");
const { getAllProducts } = require("./api/controllers/ProductsControllers");

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
const conn = new jsforce.Connection();

/** API HERE */
server.get(GET_ALL_PRODUCTS, (req, res, next) => {
  getAllProducts(req, res, next, conn);
})

server.listen(process.env.PORT || ELSLY_PORT, () => {
  const establishConnexion = new EstablishConnexion();
  establishConnexion.setConnexion(conn)
    .then(info => {
      console.log(info);
      console.log('salesforce connected !')
    })
    .catch(err => {
      console.log(err);
    })
});
