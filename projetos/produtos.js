const carrinho = [];
const contadorCarrinho = document.getElementById('contador-carrinho-flutuante');
const painelCarrinho = document.getElementById('painel-carrinho-flutuante');
const listaProdutosCarrinho = document.getElementById('lista-produtos-carrinho-flutuante');
const totalCarrinhoEl = document.getElementById('total-carrinho-flutuante');
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra-flutuante');
const btnFecharCarrinho = document.getElementById('btn-fechar-carrinho-flutuante');
const btnAbrirCarrinho = document.getElementById('btn-carrinho-flutuante');

function atualizarContador() {
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  contadorCarrinho.textContent = totalItens;
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarCarrinho() {
  listaProdutosCarrinho.innerHTML = '';
  if (carrinho.length === 0) {
    listaProdutosCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
    totalCarrinhoEl.textContent = 'Total: R$ 0,00';
    return;
  }

  let total = 0;
  carrinho.forEach(item => {
    total += item.preco * item.quantidade;

    const itemEl = document.createElement('div');
    itemEl.className = 'item-carrinho-flutuante';

    itemEl.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="info-item-flutuante">
        <p>${item.nome}</p>
        <p class="quantidade-item-flutuante">Quantidade: ${item.quantidade}</p>
        <p>Preço unitário: ${formatarPreco(item.preco)}</p>
      </div>
      <button aria-label="Remover item" class="btn-remover-item-flutuante" data-nome="${item.nome}">X</button>
    `;

    listaProdutosCarrinho.appendChild(itemEl);
  });

  totalCarrinhoEl.textContent = `Total: ${formatarPreco(total)}`;

  // Remover itens do carrinho
  document.querySelectorAll('.btn-remover-item-flutuante').forEach(btn => {
    btn.addEventListener('click', e => {
      const nome = e.target.dataset.nome;
      removerDoCarrinho(nome);
    });
  });
}

function adicionarAoCarrinho(nome, preco, imagem) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index > -1) {
    carrinho[index].quantidade++;
  } else {
    carrinho.push({ nome, preco, imagem, quantidade: 1 });
  }
  atualizarContador();
  renderizarCarrinho();
}

function removerDoCarrinho(nome) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index > -1) {
    carrinho.splice(index, 1);
    atualizarContador();
    renderizarCarrinho();
  }
}

// Comprar produto
document.querySelectorAll('.btn-comprar').forEach(botao => {
  botao.addEventListener('click', e => {
    const produtoEl = e.target.closest('.produto');
    const nome = produtoEl.dataset.nome;
    const preco = parseFloat(produtoEl.dataset.preco);
    const imagem = produtoEl.dataset.img;
    adicionarAoCarrinho(nome, preco, imagem);
    abrirCarrinho();
  });
});

// Abrir e fechar carrinho flutuante
function abrirCarrinho() {
  painelCarrinho.classList.remove('painel-carrinho-fechado');
  painelCarrinho.classList.add('painel-carrinho-aberto');
}

function fecharCarrinho() {
  painelCarrinho.classList.remove('painel-carrinho-aberto');
  painelCarrinho.classList.add('painel-carrinho-fechado');
}

btnAbrirCarrinho.addEventListener('click', () => {
  abrirCarrinho();
});

btnFecharCarrinho.addEventListener('click', () => {
  fecharCarrinho();
});

// Finalizar compra
btnFinalizarCompra.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  window.location.href = 'finalizar-compra.html';
});

// Inicializa contador e carrinho vazio
atualizarContador();
renderizarCarrinho();

// Função para filtrar produtos
function filtrarProdutos(categoria) {
  const produtos = document.querySelectorAll('.produto');
  produtos.forEach(produto => {
    if (categoria === 'todos' || produto.classList.contains(categoria)) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}
