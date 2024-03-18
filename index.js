const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
require('dotenv').config();
const { PORT } = process.env;
const updateDatabase = require('./utils/updateDatabase.js')

const startServer = async () => {
  try {
    console.log('Antes de updateDatabase');
    await updateDatabase(); 
    console.log('Después de updateDatabase');
    
    conn.sync({ force: false })
      .then(() => {
        server.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}`);
        });
      })
      .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
        
      });
  } catch (error) {
    console.error('Error en startServer:', error);
    
  }
};

startServer();
