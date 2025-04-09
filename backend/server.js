const express = require('express'); 
const dotenv = require('dotenv');
const { dbconnect } = require('./config/db');
const router = require('./routers/router'); // ✅ Import routes
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', `${process.env.FRONTEND_URL}`],
  credentials: true
}));
// ✅ Mount all routes under /api
app.use("/api", router);

// Start server
app.listen(3000, () => {
  dbconnect();
  console.log("Server is running on port 3000");
});
