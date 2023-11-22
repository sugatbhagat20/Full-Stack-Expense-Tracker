const express = require("express");

const purchaseController = require("../controllers/purchaseController");

const authenticateMiddleware = require("../middleware/auth");

const router = express.Router();

router.get(
  "/premium",
  authenticateMiddleware,
  purchaseController.purchasePremium
);

router.post(
  "/updateTransactionStatus",
  authenticateMiddleware,
  purchaseController.updateTransactionStatus
);

router.post(
  "/failed",
  authenticateMiddleware,
  purchaseController.failedTransactionStatus
);

module.exports = router;
