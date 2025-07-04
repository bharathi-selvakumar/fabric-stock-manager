const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('DB Connection Error:', err));

const Fabric = sequelize.define('Fabric', {
  fabricId: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  pricePerMeter: { type: DataTypes.FLOAT, allowNull: false },
  color: { type: DataTypes.STRING },
  supplier: { type: DataTypes.STRING },
});

sequelize.sync();

app.get('/api/fabrics', async (req, res) => {
  const fabrics = await Fabric.findAll();
  res.json(fabrics);
});

app.get('/api/fabrics/:id', async (req, res) => {
  const fabric = await Fabric.findByPk(req.params.id);
  fabric ? res.json(fabric) : res.status(404).json({ error: 'Not found' });
});

app.post('/api/fabrics', async (req, res) => {
  try {
    const fabric = await Fabric.create(req.body);
    res.status(201).json(fabric);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/fabrics/:id', async (req, res) => {
  try {
    await Fabric.update(req.body, { where: { fabricId: req.params.id } });
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/fabrics/:id', async (req, res) => {
  try {
    await Fabric.destroy({ where: { fabricId: req.params.id } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
