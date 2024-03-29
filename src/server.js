const {
  GET_ALL_PRODUCTS,
  ELSLY_PORT,
  DOT_ENV_PATH,
  PROCESS_PAYMENT,
  PROCESS_REGISTRATION,
  PROCESS_SIGNUP
} = require("./config/constants");
const express = require("express");
const jsforce = require('jsforce');
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, DOT_ENV_PATH),
});

const { EstablishConnexion } = require("./config/dataBaseConfig");
const { getAllProducts } = require("./api/controllers/ProductsControllers");
const { processPayment } = require("./api/controllers/PaymentController");
const { signin, signup } = require("./api/controllers/AuthController");

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
const conn = new jsforce.Connection();

/** API HERE */
server.get(GET_ALL_PRODUCTS, (req, res, next) => {
  getAllProducts(req, res, next, conn);
});
server.post(PROCESS_PAYMENT, (req, res, next) => {
  processPayment(req, res, next, conn);
});
server.post(PROCESS_REGISTRATION, (req, res, next) => {
  signup(req, res, next, conn);
});
server.post(PROCESS_SIGNUP, (req, res, next) => {
  signin(req, res, next, conn);
});

server.listen(process.env.PORT || ELSLY_PORT, () => {
  const establishConnexion = new EstablishConnexion();
  establishConnexion.setConnexion(conn)
    .then(info => {
      console.log('salesforce connected !');
    })
    .catch(err => {
      console.log(err);
    })
});
