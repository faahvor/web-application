const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Custom middleware to check working hours
function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours(); // 0 to 23

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
}

// Use custom middleware
app.use(checkWorkingHours);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
