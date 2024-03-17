const { getCountriesByNameWithActivities } = require('../controllers/getCountriesByNameWithActivities')

const getCountryNameHandler = async (req, res) => {
    const name = req.query.name;
  
    try {
      const matchingCountries = await getCountriesByNameWithActivities(name);
      if (matchingCountries.length > 0) {
        res.status(200).json(matchingCountries);
      } else {
        res.status(404).json({ error: "Country not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getCountryNameHandler,
  };