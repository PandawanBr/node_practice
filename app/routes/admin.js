const { check, validationResult } = require('express-validator');

module.exports = function (application) {
    application.get('/formulario_inclusao_noticia', function (req, res) {
        res.render("admin/form_add_noticia");
    });

    application.post('/noticias/salvar', [
        check('titulo', 'Título é obrigatório').not().isEmpty(),
        check('resumo', 'Resumo é obrigatório').not().isEmpty(),
        check('resumo', 'Resumo deve conter entre 10 e 100 caracteres').isLength({ min: 10, max: 100 }),
        check('autor', 'Autor é obrigatório').not().isEmpty(),
        check('data_noticia', 'Data é obrigatório').not().isEmpty(),
        check('noticia', 'Notícia é obrigatório').not().isEmpty()
    ], function (req, res) {
        var noticia = req.body;

        const erros = validationResult(req);

        console.log(erros);
        if (!erros.isEmpty()) {
            res.render("admin/form_add_noticia");
            return res.status(422).json({ errors: errors.array() });
        }
        var connection = application.config.dbConnection();
        var noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, function (error, result) {
            res.redirect('/noticias');
        });
    });
};