const express = require("express");
const app = express();

app.use(express.json());


const products = [
    { id: 1, name: "Laptop", price: 800 },
    { id: 2, name: "Mouse", price: 20 },
    { id: 3, name: "Teclado", price: 50 }
];

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
});

app.post("/products", (req, res) => {
    const { id, name, price } = req.body;

    if (products.some(p => p.id === id)) {
        return res.status(400).json({ error: "El ID ya existe" });
    }

    const newProduct = { id, name, price };
    products.push(newProduct);

    res.status(201).json(newProduct);
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de productos. Usa /products para ver la lista.");
});
