const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    // await connection.migrate.rollback()
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new ONG', async() => {
    const resp = await request(app)
      .post('/ongs')
      .send({
        name: 'ONG',
        email: 'ong@hotmail.com',
        whatsapp: '54355435435',
        city: 'São Paulo',
        uf: 'SP'
      })

      expect(resp.body).toHaveProperty('id');
      expect(resp.body.id).toHaveLength(8)
  })

  it('should be able to create new incident', async () => {
    const resp = await request(app)
      .post('/incidents')
      .set('authorization', 'ed161ed9')
      .send({
        title: "Caso 1",
        description: "Caso 1 de saude do idoso",
        value: 120.00
      })

      expect(resp.body).toHaveProperty('id')
  })
})



