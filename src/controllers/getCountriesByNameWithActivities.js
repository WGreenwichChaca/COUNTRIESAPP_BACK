const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

const getCountriesByNameWithActivities = async (name) => {
  try {
    const countries = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: { model: Activity, through: 'country_activities', as: 'activities' }, //include: Activity,
    });
    return countries;
  } catch (error) {
    throw new Error('Error al buscar países por nombre: ' + error.message);
  }
};

module.exports = {
  getCountriesByNameWithActivities,
};

