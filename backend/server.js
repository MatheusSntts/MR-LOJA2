// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// const pedidos = [];

// app.post('/api/compras', (req, res) => {
//   const { nome, email, telefone, carrinho } = req.body;

//   if (!nome || !email || !telefone || !Array.isArray(carrinho) || carrinho.length === 0) {
//     return res.status(400).json({ error: 'Dados incompletos ou carrinho vazio.' });
//   }

//   const novoPedido = {
//     id: pedidos.length + 1,
//     nome,
//     email,
//     telefone,
//     carrinho,
//     data: new Date()
//   };

//   pedidos.push(novoPedido);

//   console.log('Novo pedido:', novoPedido);

//   res.status(201).json({ message: 'Pedido realizado com sucesso!', pedido: novoPedido });
// });

// app.get('/api/pedidos', (req, res) => {
//   res.json(pedidos);
// });

// app.listen(PORT, () => {
//   console.log(`✅ Backend rodando em http://localhost:${PORT}`);
// });


const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Recebe pedido do frontend
app.post('/api/pedido', (req, res) => {
  const novoPedido = req.body;

  let pedidos = [];
  if (fs.existsSync('pedidos.json')) {
    pedidos = JSON.parse(fs.readFileSync('pedidos.json', 'utf8'));
  }

  pedidos.push(novoPedido);

  fs.writeFileSync('pedidos.json', JSON.stringify(pedidos, null, 2));

  res.status(201).json({ mensagem: 'Pedido salvo com sucesso!' });
});

// Lista todos os pedidos
app.get('/api/pedidos', (req, res) => {
  if (!fs.existsSync('pedidos.json')) return res.json([]);
  const pedidos = JSON.parse(fs.readFileSync('pedidos.json', 'utf8'));
  res.json(pedidos);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
