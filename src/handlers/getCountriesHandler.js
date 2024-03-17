const { getAllCountriesWithActivities } = require('../controllers/getAllCountriesWithActivities')

const getCountriesHandler = async (req, res) => {
    try {
      const allCountries = await getAllCountriesWithActivities();
      res.status(200).json(allCountries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    getCountriesHandler,
  };