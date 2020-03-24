const cnn = require('../database/connection')

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ong = await cnn('ongs')
      .where('id', id)
      .select('name')
      .first()

    if(!ong) {
      return res.status(400).json({ error: 'Não há ONG com esse ID'})
    }

    return res.json(ong)
  }
}
