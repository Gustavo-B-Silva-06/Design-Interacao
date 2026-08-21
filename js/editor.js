const inputCorFundo = document.querySelector("#cor-fundo");
const inputCorTexto = document.querySelector("#cor-texto");
const inputEspacamento = document.querySelector("#espacamento");
const inputUrlImagem = document.querySelector("#url-imagem");
const inputNovoItem = document.querySelector("#novo-item");
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnRemover = document.querySelector("#btn-remover");

const menuDinamico = document.querySelector("#menu-dinamico");
const listaDinamica = document.querySelector("#lista-dinamica");
const imagemMenu = document.querySelector("#imagem-menu");

inputCorFundo.addEventListener("input", (e) => {
    menuDinamico.style.backgroundColor = e.target.value;
});

inputCorTexto.addEventListener("input", (e) => {
    let links = listaDinamica.getElementsByTagName("a");
    for(let i = 0; i < links.length; i++) {
        links[i].style.color = e.target.value;
    }
});

inputEspacamento.addEventListener("input", (e) => {
    listaDinamica.style.gap = `${e.target.value}px`;
});

inputUrlImagem.addEventListener("input", (e) => {
    if (e.target.value.trim() !== "") {
        imagemMenu.src = e.target.value;
        imagemMenu.style.display = "block";
    } else {
        imagemMenu.style.display = "none";
    }
});

btnAdicionar.addEventListener("click", () => {
    const textoItem = inputNovoItem.value.trim();
    if (textoItem !== "") {
        let novoLi = document.createElement("li");
        let novoA = document.createElement("a");
        let textoNode = document.createTextNode(textoItem);
        
        novoA.appendChild(textoNode);
        novoA.href = "#";
        novoA.style.color = inputCorTexto.value; 
        
        novoLi.appendChild(novoA);
        listaDinamica.appendChild(novoLi);
        
        inputNovoItem.value = "";
    }
});

btnRemover.addEventListener("click", () => {
    if (listaDinamica.lastElementChild) {
        listaDinamica.removeChild(listaDinamica.lastElementChild);
    }
});