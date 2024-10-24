"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marketplaceController_1 = require("../controllers/marketplaceController");
const marketplaceController_2 = require("../controllers/marketplaceController");
const router = (0, express_1.Router)();
router.get('/', marketplaceController_1.getListings);
router.post('/', marketplaceController_2.createListing);
exports.default = router;
