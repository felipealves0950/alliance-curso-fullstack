import express from 'express';
import cors from 'cors';

import Usuarios from './usuarios';
import Bicicletas from './bicicletas';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/usuarios', Usuarios)
app.use('/bicicletas', Bicicletas)

app.listen (3000, () =>
                console.log('servidor rodando na porta 3000!'),
);