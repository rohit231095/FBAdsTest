const config = require('../Utils/config');
const adsSdk = require('facebook-nodejs-business-sdk');
const accessToken = config.accessToken;
const api = adsSdk.FacebookAdsApi.init(accessToken);
const AdAccount = adsSdk.AdAccount;
const Campaign = adsSdk.Campaign;
const account = new AdAccount('act_' + config.accID);

/**
 * createAd can create an Ad using this function
 * @params will be sent in url-encoded form
 * name param used to give Ad a name
 */
exports.createAd = (req, res, next) => {
    try {
        account.createCampaign([], {
            [Campaign.Fields.name]: req.body.name,
            [Campaign.Fields.status]: Campaign.Status.paused,
            [Campaign.Fields.objective]: Campaign.Objective.page_likes,
            [Campaign.Fields.special_ad_category]: 'NONE'
        })
            .then(campaign => res.json(campaign))
            .catch(err => res.json(err))
    } catch (error) {
        res.json(err);
    }
}

/**
 * getAds can fetch all the Ads using this function
 */
exports.getAds = (req, res, next) => {
    try {
        account.getCampaigns([Campaign.Fields.name])
            .then(campaigns => res.json(campaigns))
            .catch(err => res.json(err))
    } catch (error) {
        res.json(err);
    }
}

/**
 * modifyAd can modify an Ad using this function
 * @params will be sent in url-encoded form
 * campaignId id of Ad to be modified
 * name param used to give Ad a name
 */
exports.modifyAd = async (req, res, next) => {
    try {
        const campaignId = req.body.campaignId;

        const campaign = await new Campaign(campaignId, {
            [Campaign.Fields.id]: campaignId,
            [Campaign.Fields.name]: req.body.name,
            [Campaign.Fields.special_ad_category]: 'NONE'
        })
            .update();

        res.json(campaign);
    } catch (error) {
        res.json(err);
    }
}

/**
 * deleteAd can delete an Ad using this function
 * @params will be sent in url-encoded form
 * campaignId id of Ad to be deleted
 */
exports.deleteAd = async (req, res, next) => {
    try {
        const campaignId = req.body.campaignId;

        const campaign = await new Campaign(campaignId).delete();

        res.json(campaign);
    } catch (error) {
        res.json(err);
    }
}