const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// Function to load different pages
function loadPage(page, id = null) {
  if (page === 'index') {
    document.getElementById('main-content').innerHTML = `
      <h1>Bem-vindo ao Sistema de Cadastro de PCA's</h1>
    `;
  } else if (page === 'cadastro') {
    loadCadastroPage();
  } else if (page === 'lista') {
    loadListaPage();
  } else if (page === 'detalhes') {
    loadDetalhesPage(id);
  }
}

// Function to fetch all PCAs
function fetchPCAs() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayPCAs(data.slice(0, 10))) // Display only the first 10 items for simplicity
    .catch(error => console.error('Erro ao buscar PCA\'s:', error));
}

// Function to display PCA list
function displayPCAs(pcas) {
  const pcaList = document.getElementById('pcaList');
  pcaList.innerHTML = '';
  pcas.forEach(pca => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" onclick="loadPage('detalhes', ${pca.id})">${pca.title}</a>`;
    pcaList.appendChild(li);
  });
}

// Function to create a new PCA (simulated)
function createPCA(pca) {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pca)
  })
  .then(response => response.json())
  .then(data => {
    alert('PCA cadastrado com sucesso! (Simulado)');
    loadPage('lista');
  })
  .catch(error => console.error('Erro ao cadastrar PCA:', error));
}

// Function to load the cadastro page
function loadCadastroPage() {
  document.getElementById('main-content').innerHTML = `
    <h2>Cadastro de PCA</h2>
    <form id="cadastroForm">
      <div>
        <label for="nome">Nome do PCA:</label>
        <input type="text" id="nome" name="nome" required>
      </div>
      <div>
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" name="descricao" required></textarea>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  `;
  document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    createPCA({ title: nome, body: descricao, userId: 1 });
  });
}

// Function to load the lista page
function loadListaPage() {
  document.getElementById('main-content').innerHTML = `
    <h2>Lista de PCA's</h2>
    <button onclick="loadPage('cadastro')">Adicionar PCA</button>
    <ul id="pcaList"></ul>
  `;
  fetchPCAs();
}

// Function to load the detalhes page
function loadDetalhesPage(id) {
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('main-content').innerHTML = `
        <h2>Detalhes do PCA</h2>
        <p><strong>Nome:</strong> ${data.title}</p>
        <p><strong>Descrição:</strong> ${data.body}</p>
        <button onclick="deletePCA(${id})">Deletar</button>
      `;
    })
    .catch(error => console.error('Erro ao buscar detalhes do PCA:', error));
}

// Function to delete a PCA (simulated)
function deletePCA(id) {
  if (confirm("Você realmente deseja deletar este PCA?")) {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      alert('PCA deletado com sucesso! (Simulado)');
      loadPage('lista');
    })
    .catch(error => console.error('Erro ao deletar PCA:', error));
  }
}

// Initialize the application with the home page
document.addEventListener('DOMContentLoaded', () => {
  loadPage('index');
});
