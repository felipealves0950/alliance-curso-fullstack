import {Router} from 'express';
import{Client} from 'pg';

const router = Router();

router.get('/', async (req, res) => {
    let resultado =[];
    const client = criaClient();

    await client.connect()
    let queryResult = await client.query("select CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO from CARTEIRA");
    for (let row of queryResult.rows){
        resultado.push({
            codigo_ativo: row.codigo_ativo,
            quantidade: row.quantidade,
            preco_medio: row.preco_medio
        });
    }
    await client.end();
    
    res.send(JSON.stringify(resultado));
});

router.post('/', async (req, res) => {
    let payload = req.body;
    let sql = `insert into CARTEIRA(CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO) VALUES
    ('${payload.codigo_ativo}', ${payload.quantidade}, ${payload.preco_medio});
    `;
    console.log(sql);
    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();
});

router.put('/:codigo_ativo', async(req, res) =>{
    let codigo = req.params.codigo;
    let payload = req.body;

    let sql = `update CARTEIRA set
            QUANTIDADE = ${payload.quantidade},
            PRECO_MEDIO = ${payload.preco_medio}
        where
            CODIGO_ATIVO = '${codigo_ativo}';`;
            console.log(sql);
            const client = criaClient();
            await client.connect();
            await client.query(sql);
            await client.end();
        
            res.status(204);
            res.send();
})

function criaClient(){
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'dia5',
        password: 'admin',
        port: 5432
    });
};
export default router