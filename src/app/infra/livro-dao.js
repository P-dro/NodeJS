class LivroDao {

    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO LIVROS (
                    titulo,
                    preco,
                    descricao
                ) values (?,?,?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ], function (err) {
                    if (err) {
                        return reject(`Não foi possível adicionar o livro. Erro: ${err}`);
                    }
                    resolve();
                })
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros', erro);
                    return resolve(resultados);
                }
            )
        })

    }

    buscaId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE LIVROS SET 
                    titulo = ?,
                    preco = ?,
                    descricao = ?
                    WHERE id = ?
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ], (err) => {
                    if (err) {
                        return reject(`Não foi possível adicionar o livro. Erro: ${err}`);
                    }
                    resolve();
                })
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!', erro);
                    }
                    return resolve(livro);
                }
            );
        });
    }
}

module.exports = LivroDao;