const { Country, Activity } = require('../db');


const getAllCountriesWithActivities = async () => {
  try {
    const countries = await Country.findAll({
      include: { model: Activity, through: 'country_activities', as: 'activities' },
    });
    return countries;
  } catch (error) {
    throw new Error('Error al obtener los países: ' + error.message);
  }
};


module.exports = {
  getAllCountriesWithActivities,
};

