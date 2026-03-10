// Load environment variables from .env
require('dotenv').config();

// Import the Express app
const app = require('./src/app');

// Use the PORT from .env, fallback to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});