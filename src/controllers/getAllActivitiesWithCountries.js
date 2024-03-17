const { Activity, Country } = require('../db');

const getAllActivitiesWithCountries = async () => {
    try {
      const activities = await Activity.findAll({
        include: 'countries', // Incluimos los países asociados a cada actividad
      });
      return activities;
    } catch (error) {
      throw new Error('Error al obtener las actividades con países: ' + error.message);
    }
  };
  
  module.exports = {
    getAllActivitiesWithCountries,
  };
  