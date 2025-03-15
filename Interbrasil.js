// Dados das peças
const pecas = [
    { nome: "Lâmina para Roçadeira", categoria: "roçadeira", preco: "R$ 89,90", img: "assets/lamina.jpg" },
    { nome: "Corrente para Motosserra", categoria: "motosserra", preco: "R$ 129,90", img: "assets/corrente.jpg" },
    { nome: "Filtro de Ar", categoria: "roçadeira", preco: "R$ 29,90", img: "assets/filtro.jpg" },
];

// Elementos do DOM
const pecasGrid = document.getElementById('pecas-grid');
const filtroBtns = document.querySelectorAll('.filtro-btn');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const buscaInput = document.getElementById('busca');
const carrinho = document.getElementById('carrinho');
const btnRecolherCarrinho = document.getElementById('btn-recolher-carrinho');

// Carrinho
let carrinhoItens = [];
let total = 0;

// Função para carregar peças
function carregarPecas(categoria = 'todos', termoBusca = '') {
    pecasGrid.innerHTML = pecas
        .filter(peca => {
            const categoriaMatch = categoria === 'todos' || peca.categoria === categoria;
            const buscaMatch = peca.nome.toLowerCase().includes(termoBusca.toLowerCase());
            return categoriaMatch && buscaMatch;
        })
        .map(peca => `
            <div class="peca-card">
                <img src="${peca.img}" alt="${peca.nome}">
                <h3>${peca.nome}</h3>
                <p>${peca.preco}</p>
                <button class="btn-adicionar" onclick="adicionarAoCarrinho('${peca.nome}')">Adicionar ao Carrinho</button>
            </div>
        `).join('');
}

// Função para filtrar peças ao digitar na busca
function filtrarPecas() {
    const termoBusca = buscaInput.value;
    const categoriaAtiva = document.querySelector('.filtro-btn.ativo')?.dataset.categoria || 'todos';
    carregarPecas(categoriaAtiva, termoBusca);
}

// Adicionar ao carrinho
function adicionarAoCarrinho(nomePeca) {
    const peca = pecas.find(p => p.nome === nomePeca);
    carrinhoItens.push(peca);
    total += parseFloat(peca.preco.replace("R$ ", "").replace(",", "."));
    atualizarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {
    listaCarrinho.innerHTML = carrinhoItens.map(peca => `
        <li>${peca.nome} - ${peca.preco}</li>
    `).join('');
    totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
    carrinho.classList.add('ativo'); // Abrir carrinho ao adicionar item
}

// Finalizar pedido
function finalizarPedido() {
    alert(`Pedido finalizado! Total: R$ ${total.toFixed(2)}`);
    carrinhoItens = [];
    total = 0;
    atualizarCarrinho();
}

// Filtros
filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filtroBtns.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        const categoria = btn.getAttribute('data-categoria');
        carregarPecas(categoria, buscaInput.value);
    });
});

// Alternar visibilidade do carrinho
btnRecolherCarrinho.addEventListener('click', () => {
    carrinho.classList.toggle('ativo');
});

// Inicializar
carregarPecas();