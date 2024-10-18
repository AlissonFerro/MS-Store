import app from "../..";
import { ProductModel } from "../../model/Product";
import server from '../../index';
import { StoreModel } from "../../model/Store";
import mongoose from "mongoose";
const request = require('supertest');

jest.mock('../../model/Product', () => ({
    ProductModel: {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    },
}));

jest.mock('../../model/Store', () => ({
    StoreModel: {
        findOne: jest.fn()
    }
}));

const mockedFind = ProductModel.find as jest.Mock;
const mockedFindOne = ProductModel.findOne as jest.Mock;
const StoreFindOne = StoreModel.findOne as jest.Mock;

describe('GET /api/product', () => {

    beforeEach(() => {
        mockedFind.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll((done) => {
        server.close(done);
    });

    describe('GET All', () => {
        it('Deve retornar um array com 2 elementos', async () => {
            mockedFind.mockResolvedValue(
                [{
                    "_id": {
                        "$oid": "670d4acc0f3e2a44c0840332"
                    },
                    "name": "Pernambucanas",
                    "price": 400,
                    "market": {
                        "name": "Pernambucanas",
                        "store": "Loja Centro",
                        "address": "Rua Pernambuco",
                        "createdAt": 1728906350962,
                        "updatedAt": 1729107589024,
                        "deletedAt": null,
                        "_id": {
                            "$oid": "671016857946ba9da5a21014"
                        }
                    },
                    "stock": 9,
                    "createdAt": 1728906350962,
                    "updatedAt": 1729174273360,
                    "deletedAt": null,
                    "__v": 0
                },
                {
                    "_id": {
                        "$oid": "670ff5fdf79d9ec870413699"
                    },
                    "name": "Perfume1",
                    "price": 400,
                    "market": {
                        "name": "Pernambucanas",
                        "store": "Loja Centro",
                        "address": "Rua Pernambuco",
                        "createdAt": 1728906350962,
                        "updatedAt": 1729107589024,
                        "deletedAt": null,
                        "_id": {
                            "$oid": "671016857946ba9da5a21014"
                        }
                    },
                    "stock": 10,
                    "createdAt": 1729099261608,
                    "updatedAt": 1729099261608,
                    "deletedAt": null,
                    "__v": 0
                }
                ]
            )
            const res = await request(app).get('/api/product');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });

        it('Deve restornar erro caso não encontre elementos', async () => {
            mockedFind.mockResolvedValue([]);
            const res = await request(app).get('/api/product');
            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/Nenhum registro/);
        });
    });

    describe('GET By Id', () => {
        beforeEach(() => {

        })

        it('Deve retornar 404 caso não encontre o produto', async () => {
            mockedFindOne.mockResolvedValue(null);
            const res = await request(app).get('/api/product/670d4acc0f3e2a44c0840331');
            expect(res.status).toBe(404)
            expect(res.body.message).toMatch(/Nenhum produto/);
        })

        it('Deve retornar 200 caso encontre o produto', async () => {
            mockedFindOne.mockResolvedValue(
                {
                    "_id": {
                        "$oid": "670d4acc0f3e2a44c0840332"
                    },
                    "name": "Pernambucanas",
                    "price": 400,
                    "market": {
                        "name": "Pernambucanas",
                        "store": "Loja Centro",
                        "address": "Rua Pernambuco",
                        "createdAt": 1728906350962,
                        "updatedAt": 1729107589024,
                        "deletedAt": null,
                        "_id": {
                            "$oid": "671016857946ba9da5a21014"
                        }
                    },
                    "stock": 9,
                    "createdAt": 1728906350962,
                    "updatedAt": 1729174273360,
                    "deletedAt": null,
                    "__v": 0
                }
            );
            const res = await request(app).get('/api/product/670d4acc0f3e2a44c0840332');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({ 'name': 'Pernambucanas' });
        })
    });

    describe('POST', () => {
        it('Deve retornar bad request caso não tenha nome', async () => {
            const res = await request(app).post('/api/product').send({
                price: 400,
                storeId: "671016857946ba9da5a21014",
                stock: 10
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Nome/);
        });

        it('Deve retornar bad request caso não tenha price', async () => {
            const res = await request(app).post('/api/product').send({
                name: "Perfume",
                storeId: "671016857946ba9da5a21014",
                stock: 10
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Preço/);
        });

        it('Deve retornar bad request caso não tenha market', async () => {
            const res = await request(app).post('/api/product').send({
                name: "Perfume",
                price: 100,
                stock: 10
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Loja/);
        });

        it('Deve retornar bad request caso não tenha stock', async () => {
            const res = await request(app).post('/api/product').send({
                name: "Perfume",
                storeId: "671016857946ba9da5a21014",
                price: 100
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/estoque/)
        });

        it('Deve retornar o produto cadastrado caso todos atributos sejam preenchidos', async () => {
            StoreFindOne.mockResolvedValue({
                "name": "Pernambucanas",
                "store": "Loja Centro",
                "address": "Rua Pernambuco",
                "createdAt": 1728906350962,
                "updatedAt": 1729107589024,
                "deletedAt": null,
                "_id": new mongoose.Types.ObjectId()
            })
            const res = await request(app).post('/api/product').send({
                name: "Perfume",
                storeId: "671016857946ba9da5a21014",
                price: 100,
                stock: 10
            });
            expect(res.status).toBe(201);
            expect(res.body.message).toMatch(/Produto/);
            expect(res.body.message).toMatch(/criado/);
        });
    })
})