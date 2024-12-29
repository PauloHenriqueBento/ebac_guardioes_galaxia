export function setupHeaderEffects() {
    const header = document.querySelector('header');
    const headerLogo = document.querySelector('.header__logo');

    if (!header || !headerLogo) return; // Verifica se os elementos existem antes de continuar

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Efeito 1: Adiciona/remover header--hidden com base na direção do scroll
        if (currentScrollY > lastScrollY) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }

        // Efeito 2: Adiciona/remover header__logo--animated com base na posição do scroll
        if (currentScrollY > 0) {
            headerLogo.classList.add('header__logo--animated');
        } else {
            headerLogo.classList.remove('header__logo--animated');
        }

        lastScrollY = currentScrollY; // Atualiza a última posição do scroll
    };

    window.addEventListener('scroll', handleScroll);
}
