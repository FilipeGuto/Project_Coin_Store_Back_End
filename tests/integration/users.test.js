const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1'

const server = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('pessoa usuária é cadastrada com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@email.com',
          password: 'senha123',
        });
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto deve possuir as propriedades corretas', () => {
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('password');
      expect(response.body).to.have.property('coin');
      expect(response.body).to.have.property('role');
    });
  });
});

describe('POST /login', () => {
  describe('pessoa usuária loga com suceso', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com',
          password: 'senha123',
        });
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });
});

describe('GET /users', () => {
  describe('Lista todos usuários cadastrados', () => {
    let token = {};

    before(async () => {
      token = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com',
          password: 'senha123',
        }).then((res) => res.body.token);
    });

    before(async () => {
      response = await chai.request(server)
        .get('/users')
        .set('authorization', token);
    });

    it('se for autorizado, retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('se for não for autorizado, retorna o código de status 401', () => {
      expect(response).to.not.have.status(401);
    })

    it('retorna uma lista de array', () => {
      expect(response.body).to.be.a('array');
    });

    it('usuario da lista deve conter propriedades e valores corretos', () => {
      expect(response.body[0].name).to.be.equal(response.body[0].name);
      expect(response.body[0].email).to.be.equal(response.body[0].email);
      expect(response.body[0].password).to.be.equal(response.body[0].password);
      expect(response.body[0].coin).to.be.equal(response.body[0].coin);
      expect(response.body[0].role).to.be.equal(response.body[0].role);
    });
  });
});

describe('PUT /users', () => {
  describe('Altera quantidade de moedas de um usuario', () => {
    let token = {};

    before(async () => {
      token = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com',
          password: 'senha123',
        }).then((res) => res.body.token);
    });

    before(async () => {
      response = await chai.request(server)
        .put('/users')
        .send({
          email: 'test@email.com',
          coin: 500,
        })
        .set('authorization', token);
    });

    it('se for autorizado, retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('se for não for autorizado, retorna o código de status 401', () => {
      expect(response).to.not.have.status(401);
    })

    it('retorna uma objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o usuario deve conter propriedade e valor "coin" atualizado', () => {
      expect(response.body.coin).to.be.equal(response.body.coin);
    });
  });
});
