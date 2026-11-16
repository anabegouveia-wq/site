document.addEventListener('DOMContentLoaded', function() {
    // --- VARIÁVEIS DO COMPONENTE DE BUSCA E OUTROS ---
    const searchWrapper = document.querySelector('.search-wrapper');
    const searchToggle = document.querySelector('.search-toggle');
    const searchBoxContainer = document.querySelector('.search-box-container');
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm ? searchForm.querySelector('input[type="search"]') : null;
    const clearButton = searchForm ? searchForm.querySelector('.clear-button') : null;
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // 1. Funcionalidade de mostrar/esconder a caixa de busca (Lupa Externa)
    if (searchToggle && searchBoxContainer && searchInput) {
        searchToggle.addEventListener('click', function(event) {
            event.preventDefault();
            searchBoxContainer.classList.toggle('visible');
            if (searchBoxContainer.classList.contains('visible')) {
                searchInput.focus();
            }
        });
    }

    // 2. Funcionalidade do botão de limpar 'X'
    if (searchInput && clearButton && searchBoxContainer) {
        searchInput.addEventListener('input', function() {
            if (searchInput.value.length > 0) {
                clearButton.style.display = 'block';
            } else {
                clearButton.style.display = 'none';
            }
        });

        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            clearButton.style.display = 'none';
            searchBoxContainer.classList.remove('visible');
        });
    }

    // 3. LÓGICA DE BUSCA LOCAL
    if (searchForm && searchInput) {
        const contentIndex = [
            { title: "Partilha de Bens e Autonomia Financeira", url: "artigo-detalhe-1.html", keywords: "partilha bens patrimonio mulher divorcio" },
            { title: "Pensão Alimentícia para Filhos", url: "artigo-detalhe-2.html", keywords: "pensao filhos execucao inadimplencia" },
            { title: "Guarda: Compartilhada ou Unilateral?", url: "artigo-detalhe-3.html", keywords: "guarda compartilhada unilateral crianca lei 14713" },
            { title: "Medidas Protetivas de Urgência", url: "artigo-detalhe-4.html", keywords: "medidas protetivas urgencia violencia agressor" },
            { title: "Pacto Antenupcial: Autonomia no Matrimônio", url: "artigo-detalhe-5.html", keywords: "pacto antenupcial casamento seguranca" },
            { title: "Pensão Alimentícia Conjugal", url: "artigo-detalhe-6.html", keywords: "pensao conjugal vitalicia estradegia financeira" },
            { title: "Divórcio Litigioso", url: "artigo-detalhe-7.html", keywords: "divorcio litigioso consensual cautelares partilha" },
            { title: "União Estável Informal", url: "artigo-detalhe-8.html", keywords: "uniao estavel reconhecimento provas partilha 50%" },
            { title: "Outorga Conjugal: Proteção de Imóveis", url: "artigo-detalhe-9.html", keywords: "outorga conjugal imoveis familia anulacao" },
        ];

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;
            const results = [];
            contentIndex.forEach(item => {
                const searchString = (item.title + " " + item.keywords).toLowerCase();
                if (searchString.includes(query)) {
                    results.push(item);
                }
            });
            sessionStorage.setItem('searchResults', JSON.stringify(results));
            sessionStorage.setItem('searchQuery', query);
            if (searchBoxContainer) {
                searchBoxContainer.classList.remove('visible'); 
            }
            window.location.href = 'search-results.html'; 
        });
    }
    
    // 4. FUNCIONALIDADE DO MENU HAMBÚRGUER (AJUSTADA PARA O NOVO COMPORTAMENTO MOBILE)
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('menu-ativo');
            menuToggle.classList.toggle('is-open'); // Mantém a animação do hambúrguer
            document.body.classList.toggle('menu-open'); // Adiciona/remove classe ao body
        });

        // Opcional: Fechar o menu mobile ao clicar em um link (se não for um submenu)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                // Verifica se o menu mobile está aberto e se o link não é de um submenu pai
                if (mainNav.classList.contains('menu-ativo') && !link.closest('.has-submenu')) {
                    mainNav.classList.remove('menu-ativo');
                    menuToggle.classList.remove('is-open');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }

    // 5. [BÔNUS] Fecha a caixa de busca se o usuário clicar fora dela
    if (searchWrapper && searchBoxContainer) {
        document.addEventListener('click', function(event) {
            const isClickInside = searchWrapper.contains(event.target);
            // Certifica-se de que o menu principal (hambúrguer) não está aberto
            const isMenuOpen = mainNav.classList.contains('menu-ativo');
            if (searchBoxContainer.classList.contains('visible') && !isClickInside && !isMenuOpen) {
                searchBoxContainer.classList.remove('visible');
            }
        });
    }

    // 6. REMOVIDA: A funcionalidade de toggle do submenu mobile não é mais necessária com o novo design.
    // Agora o submenu será sempre visível dentro do menu principal expandido.
});