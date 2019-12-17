import express from 'express';
import calculadora from './calculadora';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())
app.use('/calculadora', calculadora);

app.get('/axios.js', (req, res) => res.sendFile(__dirname + '/axios.js'));

app.listen (3000, () =>
                console.log('servidor rodando na porta 3000!'),
);