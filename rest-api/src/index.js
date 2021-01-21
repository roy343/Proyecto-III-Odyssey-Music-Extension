const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000)
    // Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use(require('./routes/routes'))

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});