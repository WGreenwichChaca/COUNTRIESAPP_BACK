const path = require('path');
// este codigo genera duplicados?
const { Country, Activity } = require('../src/db');  // Importamos los  modelos

const axios = require('axios');

const updateDatabase = async () => {
    try {
        // Realizamos la solicitud a la API
        const response = await axios.get('http://localhost:5000/countries');
        const countries = response.data;

        // Mapeamos y filtramos los datos para el modelo Country
        for (const country of countries) {
            await Country.create({
                id: country.cca3,
                name: country.name.common,
                flags: country.flags.svg,
                continents: country.region,
                capital: country.capital && Array.isArray(country.capital) ? country.capital.join(', ') : country.capital || 'Unknown',
                subregion: country.subregion,
                area: country.area,
                population: country.population,
            });
        }

        // Mapeamos y filtramos los datos para el modelo Activity (si hay datos de actividades en la API)
        for (const country of countries) {
            if (country.activities && Array.isArray(country.activities)) {
                for (const activity of country.activities) {
                    // Crear la actividad
                    const createdActivity = await Activity.create({
                        name: activity.name,
                        difficulty: activity.difficulty,
                        duration: activity.duration,
                        season: activity.season,
                    });

                    // Asociar la actividad con el país
                    const countryInstance = await Country.findByPk(country.cca3);
                    if (countryInstance) {
                        await countryInstance.addActivity(createdActivity);
                    }
                }
            }
        }

        console.log('Base de datos actualizada exitosamente.');
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error.message);
    }
};

module.exports = updateDatabase;



