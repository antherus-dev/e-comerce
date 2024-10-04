// Carrinho de compras
let carrinho = [];
let totalCarrinho = 0;

// Função para adicionar ao carrinho
function adicionarAoCarrinho(id, nome, preco) {
    const produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    const itensCarrinhoDiv = document.getElementById("itens-carrinho");
    const totalSpan = document.getElementById("total-carrinho");
    const carrinhoLink = document.getElementById("carrinho");

    itensCarrinhoDiv.innerHTML = "";

    let total = 0;
    carrinho.forEach(produto => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-carrinho");
        itemDiv.innerHTML = `
            <p>${produto.nome} - R$${produto.preco.toFixed(2)} (x${produto.quantidade})</p>
        `;
        itensCarrinhoDiv.appendChild(itemDiv);
        total += produto.preco * produto.quantidade;
    });

    if (carrinho.length === 0) {
        itensCarrinhoDiv.innerHTML = "<p>Carrinho vazio</p>";
    }

    totalSpan.textContent = total.toFixed(2);
    carrinhoLink.querySelector("span").textContent = `Carrinho (${carrinho.length})`;
}

// Adicionar evento aos botões de adicionar ao carrinho
document.querySelectorAll('.add-carrinho').forEach(button => {
    button.addEventListener('click', function() {
        const produtoCard = this.closest('.produto-card');
        const id = produtoCard.getAttribute('data-id');
        const nome = produtoCard.getAttribute('data-nome');
        const preco = parseFloat(produtoCard.getAttribute('data-preco'));

        adicionarAoCarrinho(id, nome, preco);
    });
});
