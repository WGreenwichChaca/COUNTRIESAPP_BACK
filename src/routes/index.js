const { Router } = require("express");
const { createActivitiesHandler } = require('../handlers/createActivitiesHandler')
const { getActivitiesHandler } = require('../handlers/getActivitiesHandler')
const { getCountriesHandler } = require('../handlers/getCountriesHandler')
const { getCountryNameHandler } = require('../handlers/getCountryNameHandler')
const { getCountryCodeHandler } = require('../handlers/getCountryCodeHandler')

const router = Router();

router.get("/countries", getCountriesHandler);
router.get('/countries/name', getCountryNameHandler);
router.get('/countries/:idPais', getCountryCodeHandler);
router.post('/activities', createActivitiesHandler);
router.get('/activities', getActivitiesHandler);

module.exports = router;