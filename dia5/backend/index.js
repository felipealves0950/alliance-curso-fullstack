import express from 'express';
import cors from 'cors';

import Ativos from './ativos';
import Carteira from './carteira';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/ativos', Ativos)
app.use('/carteira', Carteira)

app.listen (3000, () =>
                console.log('servidor rodando na porta 3000!'),
);