const express = require("express");
const certificateController = require("./Certificate.controller");

const router = express.Router();

router.get("/", certificateController.getCertificates);

router.post("/", certificateController.createCertificate);

// router.put("/:id", certificateController.editTodo);

module.exports = router;
