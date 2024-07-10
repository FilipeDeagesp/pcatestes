document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Planejamento e Gestão de PCAs iniciado.');

    const cadastroPcaSection = document.getElementById('cadastro-pca');
    const pcaForm = document.getElementById('pca-form');

    document.querySelector('nav ul li a[href="#"]').addEventListener('click', function() {
        document.getElementById('content').innerHTML = `
            <h2>Bem-vindo ao Sistema de Planejamento e Gestão de PCAs</h2>
            <p>Utilize o menu acima para navegar pelo sistema.</p>`;
    });

    document.querySelector('nav ul li a[href="#Cadastrar PCA"]').addEventListener('click', function() {
        cadastroPcaSection.style.display = 'block';
    });

    pcaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const data = document.getElementById('data').value;

        console.log(`PCA Cadastrado: Nome: ${nome}, Descrição: ${descricao}, Data: ${data}`);

        alert('PCA cadastrado com sucesso!');
        pcaForm.reset();
        cadastroPcaSection.style.display = 'none';
    });
});
