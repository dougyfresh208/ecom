const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  console.log('\n----- STARTING DATABASE SYNC -----\n');
  await sequelize.sync({ force: true }); // This line ensures tables are dropped and recreated
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  // Check if the script is run directly (e.g., via `node seeds/index.js`)
  if (require.main === module) {
    // Only exit if running the script directly
    process.exit(0);
  }
};

// Export seedAll for use in other files, like server.js
module.exports = seedAll;

// If running this file directly, execute seedAll
if (require.main === module) {
  seedAll();
}
