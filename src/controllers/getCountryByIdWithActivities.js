const { Country, Activity } = require('../db');


const getCountryByIdWithActivities = async (code) => {
  try {
    const country = await Country.findOne({
      where: { id: code },
      include: { model: Activity, through: 'country_activities', as: 'activities' },
    });
    if (!country) {
      throw new Error('País no encontrado');
    }
    return country;
  } catch (error) {
    throw new Error('Error al obtener el país por código: ' + error.message);
  }
};


module.exports = {
  getCountryByIdWithActivities,
};

