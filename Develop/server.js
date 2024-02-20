// const express = require('express');
// const routes = require('./routes');
// const sequelize = require('./config/connection'); // Ensure this path is correct

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(routes);

// // sync sequelize models to the database, then turn on the server
// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
// });

const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Adjust the path if necessary
const seedAll = require('./seeds'); // Adjust the path to your seeds/index.js

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Function to initialize and seed the database, then start the server
async function initializeAndStartServer() {
  try {
    console.log('\n----- INITIALIZING DATABASE -----\n');
    // The call to seedAll will handle both syncing and seeding
    await seedAll();
    console.log('\n----- DATABASE INITIALIZED AND SEEDED -----\n');

    // Start the server
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (error) {
    console.error('Failed to initialize and start server:', error);
    process.exit(1); // Exit the process with an error code
  }
}

// Initialize and start the server
initializeAndStartServer();