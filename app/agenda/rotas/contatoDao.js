const express = require("express");
const router = express.Router();
const url = require("url");
const querystring = require("querystring");
const connection = require("./dbConfig");
/*


/**
Fazer o Insert no Postam usando o JSON
{
    "nome" : "Paulo",
    "fone" : "(62)99999-9999",
    "email" : "paulo@gmail.com"
}
*/

// http://localhost:3000/api.agenda/contato-dao/insert
router.post("/insert", (req, res, next) => {
  const { nome, fone, email } = req.body;
  const query =
    "INSERT INTO contato (nome, fone, email) VALUES (?, ?, ?)";
  connection.query(query, [nome, fone, email], (err, result) => {
    if (err) {
      console.error("Erro ao inserir contato:", err);
      res.status(500).send({ erro: "Erro ao inserir contato" });
      return;
    }
    res.status(201).send({
      mensagem: "Contato inserido com sucesso!",
      id: result.insertId,
    });
  });
});

// http://localhost:3000/api.agenda/contato-dao/getId?id=1
router.get("/getId", (req, res, next) => {
  const id = req.query.id;
  const query =
    "SELECT nome, fone, email FROM contato WHERE id_contato = " + id;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar contato:", err);
      res.status(500).send({ erro: "Erro ao buscar contato" });
      return;
    }
    res.status(200).send(results);
  });
});

/*
// http://localhost:3000/api.filme/filme-dao/getId?id=1
router.get("/getId", (req, res, next) => {
    const reqUrl = url.parse(req.url);
    const queryParams = querystring.parse(reqUrl.query);
    const param = queryParams.id;
    res.status(200).send({
        mensagem: "Contato do ID: " + param + " encontrado!",
    });
});*/

module.exports = router;