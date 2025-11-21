const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "myuser",
  password: "mypass123",
  database: "myshop",
  port: 5432
});

// GET all products
app.get("/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

// GET product by id
app.get("/products/:id", async (req, res) => {
  const result = await pool.query("SELECT * FROM products WHERE id=$1", [
    req.params.id,
  ]);
  res.json(result.rows[0]);
});

// POST new product
app.post("/products", async (req, res) => {
  const {
    name,
    description,
    price,
    weight,
    age_group,
    breed_type,
    category,
    image_url,
  } = req.body;

  const result = await pool.query(
    `INSERT INTO products (name, description, price, weight, age_group, breed_type, category, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [name, description, price, weight, age_group, breed_type, category, image_url]
  );

  res.json(result.rows[0]);
});

// DELETE product
app.delete("/products/:id", async (req, res) => {
  await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
  res.json({ message: "deleted" });
});

app.listen(8080, () => console.log("API running on port 8080"));
