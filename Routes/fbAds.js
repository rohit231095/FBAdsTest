const express = require('express');
const router = express.Router();

const adsContoller = require('../Controllers/ads');

router.get('/getAds', adsContoller.getAds);
router.post('/addAd', adsContoller.createAd);
router.put('/modifyAd', adsContoller.modifyAd);
router.put('/deleteAd', adsContoller.deleteAd);

module.exports = router;