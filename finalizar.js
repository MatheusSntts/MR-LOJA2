document.getElementById('form-finalizar').addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const endereco = document.getElementById('endereco').value;

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  fetch('http://localhost:3000/api/pedido', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome,
      email,
      endereco,
      produtos: carrinho,
      total
    })
  })
    .then(res => res.json())
    .then(data => {
      alert('✅ Pedido enviado com sucesso!');
      localStorage.removeItem('carrinho');
      window.location.href = 'index.html';
    })
    .catch(err => {
      alert('❌ Erro ao enviar pedido!');
      console.error(err);
    });
});
