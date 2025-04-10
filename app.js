const form = document.getElementById('form-tarefa');
const lista = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');

let tarefas = [];

function renderizarTarefas() {
  lista.innerHTML = '';
  let concluídas = 0;

  tarefas.forEach((tarefa, index) => {
    const card = document.createElement('div');
    card.classList.add('tarefa');
    if (tarefa.concluida) card.classList.add('concluida');

    card.innerHTML = `
      <div class="info">
        <p class="etiqueta">${tarefa.etiqueta}</p>
        <p class="titulo">${tarefa.nome}</p>
        <small>Criado em: ${tarefa.data}</small>
      </div>
      <button onclick="toggleConclusao(${index})">
        ${tarefa.concluida ? '✔' : 'Concluir'}
      </button>
    `;

    lista.appendChild(card);
    if (tarefa.concluida) concluídas++;
  });

  contador.textContent = concluídas;
}

function toggleConclusao(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  renderizarTarefas();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const etiqueta = document.getElementById('etiqueta').value || 'geral';
  const data = new Date().toLocaleDateString('pt-BR');

  tarefas.push({
    nome,
    etiqueta,
    data,
    concluida: false
  });

  form.reset();
  renderizarTarefas();
});

// tarefas iniciais
tarefas = [
  { nome: 'Implementar tela de listagem de tarefas', etiqueta: 'frontend', data: '21/08/2024', concluida: false },
  { nome: 'Criar endpoint para cadastro de tarefas', etiqueta: 'backend', data: '21/08/2024', concluida: false },
  { nome: 'Implementar protótipo da listagem de tarefas', etiqueta: 'UX', data: '21/08/2024', concluida: true }
];

renderizarTarefas();
