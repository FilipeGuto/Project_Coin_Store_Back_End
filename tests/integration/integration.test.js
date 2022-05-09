const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const defaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyNzk1ODNiZDg3YjA4NDg4OTJkNjgyMCIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiY29pbiI6MTAwfSwiaWF0IjoxNjUyMTE5NjExLCJleHAiOjE2NTI0Nzk2MTF9._uDDkTn6EfeoUUUXpYjCBCWRMnBKiIYPxk05JDx1Dmk";

const server = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

// ---------------------------------- USER ---------------------------------

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

// ------------------------------- PRODUCT ---------------------------------------

describe('POST /products', () => {
  describe('Produtos cadastrados com sucesso', () => {
    let response = {};

      before(async () => {
        response = await chai.request(server)
          .post('/products')
          .send({
            title: 'teste',
            description: 'teste',
            price: 2500,
            image: 'url-image',
          })
          .set('authorization', defaultToken);
      });

    it('se for autorizado, retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('se for não for autorizado, retorna o código de status 401', () => {
      expect(response).to.not.have.status(401);
    })

    it('retorna uma lista de objetos', () => {
      expect(response.body).to.be.a('object');
    });

    it('usuario da lista deve conter propriedades e valores corretos', () => {
      expect(response.body.title).to.be.equal(response.body.title);
      expect(response.body.description).to.be.equal(response.body.description);
      expect(response.body.price).to.be.equal(response.body.price);
      expect(response.body.image).to.be.equal(response.body.image);
    });
  });
});

describe('GET /products', () => {
  describe('Lista todos produtos cadastrados', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .get('/products')
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna uma lista de array', () => {
      expect(response.body).to.be.a('array');
    });

    it('produto da lista deve conter propriedades e valores corretos', () => {
      expect(response.body[0].title).to.be.equal(response.body[0].title);
      expect(response.body[0].description).to.be.equal(response.body[0].description);
      expect(response.body[0].value).to.be.equal(response.body[0].value);
      expect(response.body[0].image).to.be.equal(response.body[0].image);
    });
  });
});

describe('GET /products/:id', () => {
  describe('busca um produto especifico cadastrado', () => {
    let response = {};
    let newResponse = {};

    before(async () => {
      response = await chai.request(server)
        .get('/products')
    });

    before(async () => {
      newResponse = await chai.request(server)
        .get(`/products/${response.body[0]._id}`);
    });

    it('se for autorizado, retorna o código de status 200', () => {
      expect(newResponse).to.have.status(200);
    });

    it('se não for autorizado, retorna o código de status 401', () => {
      expect(newResponse).to.not.have.status(401);
    })

    it('retorna um objeto', () => {
      expect(newResponse.body).to.be.a('object');
    });

    it('produto da lista deve conter propriedades e valores correto', () => {
      expect(newResponse.body.title).to.be.equal(newResponse.body.title);
      expect(newResponse.body.description).to.be.equal(newResponse.body.description);
      expect(newResponse.body.value).to.be.equal(newResponse.body.value);
      expect(newResponse.body.image).to.be.equal(newResponse.body.image);
    });
  });
});

describe('PUT /products/:id', () => {
  describe('Altera dados de um produto cadastrado', () => {
    let response = {};
    let newResponse = {};

    before(async () => {
      response = await chai.request(server)
        .get('/products')
    });

    before(async () => {
      newResponse = await chai.request(server)
        .put(`/products/${response.body[0]._id}`)
        .send({
          title: "new product",
          description: "new product description",
          price: 2000,
          image: "image-url"
        })
        .set('authorization', defaultToken);
    });

    it('se for autorizado, retorna o código de status 200', () => {
      expect(newResponse).to.have.status(200);
    });

    it('se não for autorizado, retorna o código de status 401', () => {
      expect(newResponse).to.not.have.status(401);
    })

    it('retorna um objeto', () => {
      expect(newResponse.body).to.be.a('object');
    });

    it('produto da lista deve conter propriedades e valores atualizados', () => {
      expect(newResponse.body.title).to.be.equal(newResponse.body.title);
      expect(newResponse.body.description).to.be.equal(newResponse.body.description);
      expect(newResponse.body.value).to.be.equal(newResponse.body.value);
      expect(newResponse.body.image).to.be.equal(newResponse.body.image);
    });
  });
});

describe('DELETE /products/:id', () => {
  describe('Exclui um produto cadastrado', () => {
    let response = {};
    let newResponse = {};

    before(async () => {
      response = await chai.request(server)
        .get('/products')
    });

    before(async () => {
      newResponse = await chai.request(server)
        .delete(`/products/${response.body[0]._id}`)
        .set('authorization', defaultToken);
    });

    it('se for autorizado, retorna o código de status 200', () => {
      expect(newResponse).to.have.status(200);
    });

    it('se não for autorizado, retorna o código de status 401', () => {
      expect(newResponse).to.not.have.status(401);
    })

    it('retorna um objeto', () => {
      expect(newResponse.body).to.be.a('object');
    });

    it('ao ser excluido retorna a mensagem "Product deleted successfully"', () => {
      expect(newResponse.body.message).to.be.equal(newResponse.body.message);
    });
  });
});