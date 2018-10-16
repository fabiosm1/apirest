const restify = require('restify');
const clients = require('restify-clients');
const errs = require('restify-errors');

const client = clients.createJsonClient({
    url: 'http://localhost:8000'
});

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

// Conectando com banco de dados atraves do knex
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '1234',
      database : 'dbnode'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// ROTAS

server.get('/', (req, res, next) => {

    //Faz chamada pelo nome da tabela criada no banco e pega os dados e devolve para aplicação
    knex('nodetable').then((dados) => { 
        res.send(dados);
    }, next) //next função do restify caso ocorra erro

});

server.post('/create', (req, res, next) => {

    knex('nodetable') 
        .insert(req.body) //Passa os dados que estão vindo do corpo da requisição
        .then((dados) => {
            res.send(dados);
        }, next)

        //var vendas = req.body["vendas"];
        
        //client.post(vendas, function(err, req){
        //        console.log('ok');
        //});
        //client.()
});

server.post('/vendas', (req, res, next) => {

    client.get('/api/vendas', function(err, req){
        console.log('ok');
    });

});


server.get('/:id', (req, res, next) => {

    const { id } = req.params //Recebe os parametros vindo do corpo da requisição

    knex('nodetable')
        .where('id', id)
        .first()
        .then((dados) => {
            if(!dados) return res.sens(new errs.BadRequestError('Nada foi encontrado'))
            res.send(dados);
    }, next)

});

server.put('/update/:id', (req, res, next) => {

    const { id } = req.params

    knex('nodetable')
        .where('id', id)
        .update(req.body)
        .then((dados) => {
            if(!dados) return res.sens(new errs.BadRequestError('Nada foi encontrado'))
            res.send('Dados atualizados');
    }, next)

});

server.del('/delete/:id', (req, res, next) => {

    const { id } = req.params

    knex('nodetable')
        .where('id', id)
        .delete()
        .then((dados) => {
            if(!dados) return res.sens(new errs.BadRequestError('Nada foi encontrado'))
            res.send('Dados excluidos');
    }, next)

});