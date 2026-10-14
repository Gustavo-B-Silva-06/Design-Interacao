class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <!-- O slot permite injetar conteúdo dinâmico pelo HTML -->
                <h1><slot name="titulo">Trabalhos de Interação Web</slot></h1>
            </header>
        `;
    }
}
customElements.define('my-header', MyHeader);

class MyNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="menu-principal">
                <ul>
                    <li><a href="index.html">Apresentação</a></li>
                    <li><a href="editor.html">Editor de Menus (T1)</a></li>
                    <li><a href="prova.html">Prova On-line (T2)</a></li>
                    <li><a href="#">Trabalho 3</a></li>
                </ul>
            </nav>
        `;
    }
}
customElements.define('my-nav', MyNav);

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <p>Desenvolvido para a disciplina de Interação Web - 2026</p>
            </footer>
        `;
    }
}
customElements.define('my-footer', MyFooter);