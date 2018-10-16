server.post('/create/:id', (req, res, next) => {

    const { id } = req.params //Recebe os parametros vindo do corpo da requisição

    knex('nodetable')
        .where('id', id)
        .first()
        .then((dados) => {
            if(!dados) return res.sens(new errs.BadRequestError('Nada foi encontrado'))

            client.post('/api/vendas', function(err, req){
                console.log('ok');
            }); 
    }, next)

    
});