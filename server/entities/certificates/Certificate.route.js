const express = require("express");
const certificateController = require("./Certificate.controller");
const certificateValidater = require("./Certificate.validation");

const router = express.Router();

router.get("/", certificateValidater.validateGetCertificates, certificateController.getCertificates);

router.post("/", certificateValidater.validateCreateCertificate, certificateController.createCertificate);

// router.put("/:id", certificateController.editTodo);

module.exports = router;
