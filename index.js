const express = require('express');
const path = require('path');
const app = express();
const rutaApi = require('./routes/app.routers');

const PORT = process.env.PORT || 8080;

//estaticos
app.use(express.static(path.resolve(__dirname, 'public')));

//rutas
app.use('/api', rutaApi);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const connectedServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

connectedServer.on('error', (err) => {
    console.error(err);
});