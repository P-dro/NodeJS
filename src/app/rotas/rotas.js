// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'controle_compras'
// });

// connection.connect(function (err) {
//     if (err) throw err;
// });

// module.exports = connection;
//module.exports = sqlConnection();
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', function (req, resp) {
        resp.send(
            `
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Casa do Código</h1>
            </body>
        </html>
        `
        );
    });

    app.get('/livros', function (req, resp) {
        new LivroDao(db).lista()
            .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function (req, resp) {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.post('/livros', function (req, resp) {
        req.body;
        new LivroDao(db).adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));

    });

    app.get('/livros/form/:id', function (req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
            .then(livro =>
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));

    });

    app.delete('/livros/:id', function (req, resp) {
        const id = req.params.id;

        new LivroDao(db).remove(id)
            .then(() => resp.status(200).end())
            .catch(error => console.log(`Erro ao remover  o livro... ${error}`));
    });


}


















/* app.get('/clientes', function (req, resp) {
            connection.query(mysql, values, function (err) {

                connection.end(); // close the connection

                if (err) {
                    throw err;
                }

                // Execute the callback
                next.apply(this, arguments);


                resp.marko(
                    require(this),
                    {
                        clientes: [
                            {
                                id: this.ID,
                                titulo: this.NOME
                            }
                        ]
                    }
                );
            });
        }); */