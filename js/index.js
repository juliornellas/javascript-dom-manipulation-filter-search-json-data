/**
 * PARTE 1
 * Conexão JS/HTML
 */
console.log('Arquivo index.js!')

/**
 * PARTE 2
 * Import dos dados
 */
import books from '../data/books.json' assert {type: "json"}

//Dados importados
console.log(books);

//Tipo de dados
console.log(typeof books)

//Copiar objeto
const newBooks = Object.assign([], books);

console.log('NewBooks', newBooks)

//Tipo de dados
console.log(typeof newBooks)

/**
 * PARTE 3
 * Capta o elemento HTML para exibição dos dados
 */

//Seleciona o elemento principal
const main = document.querySelector("#app");

/**
 * PARTE 4
 * 1. Inserir dados no HTML
 * 2. Criar função para recarregar dados
 * 3. Função remove elemento principal dos livros
 */

function recarregarEscolaLiteraria(data){

    const collection = data ? data : newBooks;

    /**
     * Inserir dados no HTML
     */
    const books = document.createElement("div");
    books.setAttribute('id', 'books');

    collection.forEach((book) => {
        const content = document.createElement("div");
        content.innerHTML = `
            <div class="card mb-3 p-2" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <a href="${book.link}" target="_blank" style="text-decoration:none">
                        <img src="${book.cover}" class="img-fluid rounded mx-auto d-block" alt="${book.title}">
                    </a>
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}
                        <small class="text-muted">${book.author}</small></h5>
                        <p class="card-title"><strong>Sinopse</strong></p>
                        <p class="card-text">${book.synopsis}</p>
                        <p class="card-text"><small class="text-muted">Escola literária: ${book.literary} <br /> Categoria: ${book.category}</small></p>
                    </div>
                    </div>
                </div>
            </div>
        `;
        books.appendChild(content)
    });

    main.appendChild(books)

}

recarregarEscolaLiteraria();

function removeBooksContent(){
    document.querySelector('#books').remove();
}

/**
 * PARTE 5
 * Funções para filtrar dados
 */
export function escolaLiterariaEstrangeira(){
    removeBooksContent();
    const filtro = newBooks.filter((book) => book.literary === "Estrangeira");
    recarregarEscolaLiteraria(filtro);
    console.log('ESCOLA LITERARIA ESTRANGEIRA', filtro);
}

export function escolaLiterariaBrasileira(){
    removeBooksContent();
    const filtro = newBooks.filter((book) => book.literary === "Brasileira");
    recarregarEscolaLiteraria(filtro);
    console.log('ESCOLA LITERARIA BRASILEIRA', filtro);
}

export function escolaLiterariaTodas(){
    removeBooksContent();
    recarregarEscolaLiteraria();
    console.log('ESCOLA LITERARIA TODAS')
}

/**
 * PARTE 6
 * Search livro
 */
export function searchBook(data, literary){
    const filtro = newBooks.filter((book) => book.title.toLowerCase().includes(data) && book.literary === literary);

    //Verifica se coleção é VAZIA
    filtro.length == 0
    ? alert('Sua busca, não encontrou nenhum resultado!') 
    : (removeBooksContent(), recarregarEscolaLiteraria(filtro))

    console.log('ESCOLA LITERARIA SEARCH LIVROS', filtro)
}