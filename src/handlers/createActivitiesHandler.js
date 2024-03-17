const { createActivity } = require('../controllers/createActivity');

const createActivitiesHandler = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
   
    try {
        
        if (!season) {
            return res.status(400).json({ error: 'La temporada es un campo requerido.' });
        }

        const newActivity = await createActivity(
            name,
            difficulty,
            duration,
            season,
            countries
        );

        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
  createActivitiesHandler,
};
