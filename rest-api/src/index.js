const express = require('express');
const cors = require('cors');
const app = express();

// Inicio y configuracion del servidor
app.set('port', process.env.PORT || 3000)
app.use(express.json());
app.use(cors());
app.use(require('./routes/routes'))
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});