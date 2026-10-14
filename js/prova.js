const bancoDeQuestoes = [
    {
        pergunta: "Qual tag HTML é usada para incluir JavaScript externo?",
        alternativas: ["<script>", "<js>", "<javascript>"],
        correta: 0
    },
    {
        pergunta: "Qual palavra-chave define uma variável que não pode ter seu valor reatribuído em JS?",
        alternativas: ["var", "let", "const"],
        correta: 2
    },
    {
        pergunta: "O que o método appendChild() faz no DOM?",
        alternativas: ["Remove o último elemento filho", "Adiciona um nodo como o último filho de um elemento", "Substitui um elemento pai"],
        correta: 1
    }
];

class MyTest extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderizarProva();
    }

    renderizarProva() {

        let questoesHTML = bancoDeQuestoes.map((q, indexQuestao) => {
            let alternativasHTML = q.alternativas.map((alt, indexAlt) => {
                
                
                let altTexto = alt.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                
                return `
                <div class="alternativa">
                    <input type="radio" id="q${indexQuestao}a${indexAlt}" name="q${indexQuestao}" value="${indexAlt}" required>
                    <label for="q${indexQuestao}a${indexAlt}">${altTexto}</label>
                </div>
                `;
            }).join('');

            return `
                <fieldset class="questao">
                    <legend>Questão ${indexQuestao + 1}: ${q.pergunta}</legend>
                    ${alternativasHTML}
                </fieldset>
            `;
        }).join('');

        this.shadowRoot.innerHTML = `
            <style>
                /* CSS Encapsulado no Shadow DOM */
                :host {
                    display: block;
                    background-color: #1e1e1e;
                    color: #e0e0e0;
                    padding: 20px;
                    border-radius: 4px;
                    text-align: left;
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                }
                fieldset {
                    border: 1px solid #444;
                    border-radius: 4px;
                    padding: 15px;
                    margin-bottom: 20px;
                }
                legend {
                    font-weight: bold;
                    padding: 0 5px;
                    color: #f5f5f5;
                }
                .alternativa {
                    margin-bottom: 10px;
                }
                input[type="radio"] {
                    margin-right: 8px;
                }
                button {
                    background-color: #f5f5f5;
                    color: #111;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    font-weight: bold;
                    text-transform: uppercase;
                    border-radius: 2px;
                }
                button:hover { background-color: #ccc; }
                .resultado {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #2a2a2a;
                    border-left: 4px solid #4CAF50;
                }
            </style>
            
            <form id="formulario-prova">
                ${questoesHTML}
                <button type="submit">Finalizar Prova</button>
            </form>
            <div id="area-resultado"></div>
        `;

        this.shadowRoot.querySelector('#formulario-prova').addEventListener('submit', (e) => this.corrigirProva(e));
    }

    corrigirProva(e) {
        e.preventDefault(); 
        const form = e.target;
        let nota = 0;
        let gabaritoHTML = '<h3>Resultado da Avaliação</h3>';

        bancoDeQuestoes.forEach((q, index) => {
            const respostaEscolhida = form.elements[`q${index}`].value;
            const acertou = parseInt(respostaEscolhida) === q.correta;
            
            if (acertou) nota++;

            const textoSuaResposta = q.alternativas[respostaEscolhida].replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const textoRespostaCerta = q.alternativas[q.correta].replace(/</g, "&lt;").replace(/>/g, "&gt;");

            gabaritoHTML += `
                <p><strong>Questão ${index + 1}:</strong> ${acertou ? 'Correta ✅' : 'Incorreta ❌'}<br>
                Sua resposta: ${textoSuaResposta}<br>
                Resposta certa: ${textoRespostaCerta}</p>
                <hr>
            `;
        });

        gabaritoHTML += `
            <h2>Nota Final: ${nota} / ${bancoDeQuestoes.length}</h2>
            <button id="btn-refazer">Fazer Novamente</button>
        `;

        const areaResultado = this.shadowRoot.querySelector('#area-resultado');
        areaResultado.innerHTML = `<div class="resultado">${gabaritoHTML}</div>`;
        form.style.display = 'none'; 

        this.shadowRoot.querySelector('#btn-refazer').addEventListener('click', () => {
            form.reset();
            form.style.display = 'block';
            areaResultado.innerHTML = '';
        });
    }
}
customElements.define('my-test', MyTest);