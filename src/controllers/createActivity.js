const { Activity, Country, sequelize } = require('../db');

const createActivity = async (name, difficulty, duration, season, countries) => {
    const t = await sequelize.transaction();
  
    try {
      const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      }, { transaction: t });
  
      // Relacionamos la actividad con los países indicados
      if (countries && Array.isArray(countries) && countries.length > 0) {
        console.log('Identificadores de países:', countries);
        const countryObjects = await Country.findAll({
          where: {
            id: countries,
          },
        });
  
        console.log('Countries:', countryObjects);  // Agrega esta línea para imprimir los países
        await newActivity.addCountries(countryObjects, { transaction: t });
      }
  
      await t.commit(); // Commit de la transacción si todo fue exitoso
      return newActivity;
    } catch (error) {
      await t.rollback(); // Revertir la transacción en caso de error
      throw new Error('Error al crear la actividad: ' + error.message);
    }
  };
  
  module.exports = {
    createActivity,
  };
  


// const { Activity, Country, sequelize } = require('../db');
// const createActivity = async (name, difficulty, duration, season, countries) => {
//     const t = await sequelize.transaction();

//     try {
//         const newActivity = await Activity.create({
//             name,
//             difficulty,
//             duration,
//             season,
//         }, { transaction: t });

//         // Relacionamos la actividad con los países indicados
//         if (countries && Array.isArray(countries) && countries.length > 0) {
//             for (const countryCode of countries) {
//                 const countryToUpdate = await Country.findByPk(countryCode, { transaction: t });
//                 if (countryToUpdate) {
//                     await newActivity.addCountry(countryToUpdate, { transaction: t });
//                 }
//             }
//         }

//         await t.commit();
//         return newActivity;
//     } catch (error) {
//         await t.rollback();
//         throw new Error('Error al crear la actividad: ' + error.message);
//     }
// };
// module.exports = {
//     createActivity,
// };

