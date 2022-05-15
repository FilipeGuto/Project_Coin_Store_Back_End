# Bem-vindos ao projeto Coin_Store

## Contexto

---

Esse projeto foi desenvolvido para um teste tecnico.

A proposta era desenvolver uma aplicação full stack de um e-commerce com duas rotas especificas de usuario e admin, e controle de coins. A rota ADMN = tem acesso a criação de produtos e atualização de usuario. A rota USER = tem acesso aos produtos, preço e descrição, além de ter suas coins visiveis.

## Como visualizar este projeto

Acesse:  [`Coin Store`](https://deft-moxie-065dae.netlify.app/).

Projeto feito de forma responsiva para rodar tanto web como mobile.


## Back-end

A API consta com rotas para usuarios: 
  * `/` [`POST`] Cria um novo usuario e adiciona no banco
  * `/` [`POST`] Loga com um usuario gerando token e informações no banco
  * `/` [`GET`] Caso tenha um token de autenticação, busca todos usuarios que esta no banco
  * `/` [`PUT`]  Caso tenha um token de autenticacao, edita dados de um usuario cadastrado no banco
  * `/` [`DELETE`] Caso tenha um token de autenticação, deleta um usuario do banco

---

A API consta com rotas para produtos:
  * `/` [`POST`] Cria um novo produto e adiciona no banco (somente acessada pelo admin)
  * `/` [`GET`] Busca todos produtos cadastrados no banco
  * `/` [`PUT`]  Eita dados de um produto cadastrado no banco (somente acessada pelo admin)
  * `/` [`DELETE`] Deleta produtos no banco (somente acessada pelo admin)


## Modo de desenvolvimento

---

O projeto foi desenvolvido utilizando Model, Service e Controller, além de ter sido utilizado CRUD para requições, foi usado também
JWT token para maior segurança de dados, ao final da aplicação foi feito deploy para o heroku, onde o banco utilizado que foi o mongoDb
foi hospedado no Atlas.
Além disso ao final foram feitos testes de integração para o CRUD e os dados recebidos, onde 33 testes foram concluidos.


### Tecnologias

---

NodeJS, Express, JWT, MongoDb, Chai, Sinon

---

## Próximos passos

* Implementação de testes unitarios, e um cobrimento maior de erros.

---

## Contatos

<div style="display: flex; align-items: center; justify-content: space-between;">
  <div>
    <h2>Filipe Guto</h2>
  <div style="display: flex; align-items: center;">
    <img align="center" alt="Linkedin" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg">https://www.linkedin.com/in/filipeguto/
  </div>
  <br/>
  <div style="display: flex;align-items: center;">
    <img align="center" alt="github" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg"> https://github.com/FilipeGuto
  </div>
  <br/>
   <div style="display: flex;align-items: center;">
    EMAIL: filipeguto95@gmail.com
  </div>
<br/>
