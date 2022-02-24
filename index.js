import express from 'express';
import path  from 'path' 

const app = express();
const {default: router} = await import ('./routes/app.routers.js');

const PORT = process.env.PORT || 8080;

//estaticos
app.use(express.static('public'));

//rutas

app.use('/api', router);
app.get('/', (req, res) => {
    res.send('Proyecto Final Coderhouse, primera entrega');
});


const connectedServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

connectedServer.on('error', (err) => {
    console.error(err);
});