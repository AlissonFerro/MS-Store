import app from "../..";
import server from '../../index';
import { StoreModel } from "../../model/Store";
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
        find: jest.fn(),
        findOne: jest.fn()
    }
}));

const StoreFind = StoreModel.find as jest.Mock;
const StoreFindOne = StoreModel.findOne as jest.Mock;

describe('/api/store', () => {
    beforeEach(() => {

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll((done) => {
        server.close(done);
    });
    describe('GET All', () => {
        it('Deve retornar not found caso não contenha nenhum item', async () => {
            StoreFind.mockResolvedValue([]);
            const res = await request(app).get('/api/store');
            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/Nenhum/);
            expect(res.body.message).toMatch(/registro/);
        });

        it('Deve retornar um array com 2 elementos', async () => {
            StoreFind.mockResolvedValue([
                {
                    "_id": {
                        "$oid": "670d047130725e7c7f634ec2"
                    },
                    "name": "Pernambucanas",
                    "store": "Loja Centro",
                    "address": "Rua Pernambuco",
                    "createdAt": 1728906350962,
                    "updatedAt": 1729107589024,
                    "deletedAt": null,
                    "__v": 0
                },
                {
                    "_id": {
                        "$oid": "670d047130725e7c7f634ec2"
                    },
                    "name": "Pernambucanas",
                    "store": "Loja Centro",
                    "address": "Rua Pernambuco",
                    "createdAt": 1728906350962,
                    "updatedAt": 1729107589024,
                    "deletedAt": null,
                    "__v": 0
                }
            ]);
            const res = await request(app).get('/api/store');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });

    describe('GET By Id', () => {
        it('Deve retornar not found caso não encontre o id', async () => {
            StoreFindOne.mockResolvedValue(null);
            const res = await request(app).get('/api/store/670d047130725e7c7f634ec2');
            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/Loja/)
            expect(res.body.message).toMatch(/não/)
        });
        it('Deve retornar uma loja caso encontre pelo id', async () => {
            StoreFindOne.mockResolvedValue({
                "_id": {
                    "$oid": "670d047130725e7c7f634ec2"
                },
                "name": "Pernambucanas",
                "store": "Loja Centro",
                "address": "Rua Pernambuco",
                "createdAt": 1728906350962,
                "updatedAt": 1729107589024,
                "deletedAt": null,
                "__v": 0
            });
            const res = await request(app).get('/api/store/670d047130725e7c7f634ec2');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({name: 'Pernambucanas'});
            expect(res.body).toMatchObject({store: 'Loja Centro'});
            expect(res.body).toMatchObject({address: 'Rua Pernambuco'});
        });

        it('Deve retornar not found caso o id esteja deletado', async () => {
            StoreFindOne.mockResolvedValue({
                _id: { "$oid": "670d047130725e7c7f634e2" },
                name: "Pernambucanas",
                store: "Loja Centro",
                address: "Rua Pernambuco",
                createdAt: 1728906350962,
                updatedAt: 1729107589024,
                deletedAt: 1729107589024,
                __v: 0
            });

            const res = await request(app).get('/api/store/670d047130725e7c7f634ec2');
            console.log(res.body);
            expect(res.status).toBe(404);
        })
    })
});
