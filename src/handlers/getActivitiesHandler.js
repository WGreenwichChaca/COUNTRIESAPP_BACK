const { getAllActivitiesWithCountries } = require('../controllers/getAllActivitiesWithCountries')

const getActivitiesHandler = async (req, res) => {
    try {
        // Obtenemos todas las actividades con información de los países relacionados
        const activities = await getAllActivitiesWithCountries(); 
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getActivitiesHandler,
};