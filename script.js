document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Planejamento e Gestão de PCAs iniciado.');

    const cadastroPcaSection = document.getElementById('cadastro-pca');
    const consultaPcaSection = document.getElementById('consulta-pca');
    const relatoriosSection = document.getElementById('relatorios');
    const pcaForm = document.getElementById('pca-form');
    const pcaList = document.getElementById('pca-list');
    const reportOutput = document.getElementById('report-output');
    const generateReportButton = document.getElementById('generate-report');

    let pcaDatabase = [];

    // Event listeners para navegação
    document.getElementById('home-link').addEventListener('click', function() {
        document.getElementById('content').innerHTML = `
            <h2>Bem-vindo ao Sistema de Planejamento e Gestão de PCAs</h2>
            <p>Utilize o menu acima para navegar pelo sistema.</p>`;
        cadastroPcaSection.style.display = 'none';
        consultaPcaSection.style.display = 'none';
        relatoriosSection.style.display = 'none';
    });

    document.getElementById('cadastro-link').addEventListener('click', function() {
        cadastroPcaSection.style.display = 'block';
        consultaPcaSection.style.display = 'none';
        relatoriosSection.style.display = 'none';
    });

    document.getElementById('consulta-link').addEventListener('click', function() {
        cadastroPcaSection.style.display = 'none';
        consultaPcaSection.style.display = 'block';
        relatoriosSection.style.display = 'none';
        renderPcaList();
    });

    document.getElementById('relatorios-link').addEventListener('click', function() {
        cadastroPcaSection.style.display = 'none';
        consultaPcaSection.style.display = 'none';
        relatoriosSection.style.display = 'block';
    });

    // Event listener para cadastro de PCA
    pcaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const data = document.getElementById('data').value;

        const newPca = { nome, descricao, data };
        pcaDatabase.push(newPca);

        console.log(`PCA Cadastrado: Nome: ${nome}, Descrição: ${descricao}, Data: ${data}`);

        alert('PCA cadastrado com sucesso!');
        pcaForm.reset();
        cadastroPcaSection.style.display = 'none';
    });

    // Event listener para geração de relatório
    generateReportButton.addEventListener('click', function() {
        generateReport();
    });

    // Função para renderizar lista de PCAs
    function renderPcaList() {
        pcaList.innerHTML = '';
        if (pcaDatabase.length === 0) {
            pcaList.innerHTML = '<p>Nenhum PCA cadastrado.</p>';
        } else {
            pcaDatabase.forEach((pca, index) => {
                const pcaItem = document.createElement('div');
                pcaItem.classList.add('pca-item');
                pcaItem.innerHTML = `
                    <h3>PCA ${index + 1}</h3>
                    <p><strong>Nome:</strong> ${pca.nome}</p>
                    <p><strong>Descrição:</strong> ${pca.descricao}</p>
                    <p><strong>Data:</strong> ${pca.data}</p>
                `;
                pcaList.appendChild(pcaItem);
            });
        }
    }

    // Função para gerar relatório de PCAs
    function generateReport() {
        if (pcaDatabase.length === 0) {
            reportOutput.innerHTML = '<p>Nenhum PCA cadastrado.</p>';
        } else {
            let reportHtml = '<h3>Relatório de PCAs</h3>';
            pcaDatabase.forEach((pca, index) => {
                reportHtml += `
                    <div class="report-item">
                        <h4>PCA ${index + 1}</h4>
                        <p><strong>Nome:</strong> ${pca.nome}</p>
                        <p><strong>Descrição:</strong> ${pca.descricao}</p>
                        <p><strong>Data:</strong> ${pca.data}</p>
                    </div>
                `;
            });
            reportOutput.innerHTML = reportHtml;
        }
    }
});
