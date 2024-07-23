const express = require("express");
const cors = require("cors");
const routes = require('./routes');
const db = require('./models');
const fs = require('fs');
const path = require('path');
// const Issue = require('./models/issue');
// const Attachment = require('./models/attachment');

const app = express();
const PORT = process.env.PORT || 8080;

// // Enable CORS for all origins
// app.use(cors());

// // Or enable CORS for specific origins
// var corsOptions = { origin: "http://localhost:8081" };
// app.use(cors(corsOptions));


// // Add to the database object
// db.Issue = Issue;
// db.Attachment = Attachment;

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.use(cors());
app.use(express.json());  // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));  // parse requests of content-type - application/x-www-form-urlencoded

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
