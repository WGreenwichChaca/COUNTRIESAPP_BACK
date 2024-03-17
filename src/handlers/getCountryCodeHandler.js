const { getCountryByIdWithActivities } = require('../controllers/getCountryByIdWithActivities')

const getCountryCodeHandler = async (req, res) => {
    const idPais = req.params.idPais;
  
    try {
      const country = await getCountryByIdWithActivities(idPais);
      res.status(200).json(country);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    getCountryCodeHandler,
  };