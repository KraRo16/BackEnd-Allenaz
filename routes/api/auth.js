const express = require("express");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const { CtrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/userAuth");
const ctrl = require("../../controllers");
const upload = require("../../middlewares");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  CtrlWrapper(ctrl.register)
);

module.exports = router;
