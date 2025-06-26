function obterCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const carrinho = obterCarrinho();
  const contador = document.getElementById("carrinho-contador");
  if (contador) {
    contador.textContent = carrinho.length;
  }
}

function adicionarAoCarrinho(nome, preco) {
  const carrinho = obterCarrinho();
  carrinho.push({ nome, preco });
  salvarCarrinho(carrinho);
  alert(`${nome} adicionado ao carrinho!`);
}

function removerItem(index) {
  const carrinho = obterCarrinho();
  carrinho.splice(index, 1);
  salvarCarrinho(carrinho);
  carregarCarrinhoNaPagina(); // Atualiza visualmente
}

function carregarCarrinhoNaPagina() {
  const itens = obterCarrinho();
  const container = document.getElementById("carrinho-itens");
  const total = document.getElementById("total-geral");
  container.innerHTML = "";
  let totalGeral = 0;

  if (itens.length === 0) {
    container.innerHTML = "<p class='text-center'>Seu carrinho está vazio.</p>";
    total.textContent = "0.00";
    return;
  }

  itens.forEach((item, index) => {
    totalGeral += item.preco;
    const div = document.createElement("div");
    div.className = "col-12";
    div.innerHTML = `
      <div class="d-flex justify-content-between align-items-center border p-3 rounded mb-2">
        <div>
          <h6>${item.nome}</h6>
          <p class="mb-0 text-success">R$ ${item.preco.toFixed(2)}</p>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button>
      </div>
    `;
    container.appendChild(div);
  });

  total.textContent = totalGeral.toFixed(2);
}

// Ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  atualizarContadorCarrinho();

  if (document.getElementById("carrinho-itens")) {
    carregarCarrinhoNaPagina();
  }
});
