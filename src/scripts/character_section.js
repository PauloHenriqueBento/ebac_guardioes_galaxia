// Funções auxiliares
export function hideAllInfo() {
    const infosContainer = document.querySelectorAll('[data-character-id]');
    for (const info of infosContainer) {
        info.classList.remove('characters__info__list__item--is-active');
    }
}

export function hideAllOverlay() {
    const overlayContainer = document.querySelectorAll('.characters__main__list__item__overlay');
    for (const overlay of overlayContainer) {
        overlay.classList.remove('characters__main__list__item__overlay--is-active');
    }
}

// Função para verificar o layout atual
function isMobileView() {
    return window.innerWidth <= 768;
}

// Função principal
export function setupCharacterSection() {
    const faces = document.querySelectorAll('[data-character-face]');
    const list = document.querySelector('.characters__main__list');
    let isDragging = false;
    let startX, startY;
    let scrollLeft, scrollTop;

    // Efeito de Drag
    const handleScrollLoop = () => {
        if (isMobileView()) {
            const maxScrollLeft = list.scrollWidth - list.clientWidth;
            if (list.scrollLeft <= 0) {
                list.scrollLeft = maxScrollLeft;
            } else if (list.scrollLeft >= maxScrollLeft) {
                list.scrollLeft = 0;
            }
        } else {
            const maxScrollTop = list.scrollHeight - list.clientHeight;
            if (list.scrollTop <= 0) {
                list.scrollTop = maxScrollTop;
            } else if (list.scrollTop >= maxScrollTop) {
                list.scrollTop = 0;
            }
        }
    };

    list.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - list.offsetLeft;
        startY = e.pageY - list.offsetTop;
        scrollLeft = list.scrollLeft;
        scrollTop = list.scrollTop;
        list.style.cursor = 'grabbing';
    });

    list.addEventListener('mouseleave', () => {
        isDragging = false;
        list.style.cursor = 'grab';
    });

    list.addEventListener('mouseup', () => {
        isDragging = false;
        list.style.cursor = 'grab';
    });

    list.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();

        if (isMobileView()) {
            const x = e.pageX - list.offsetLeft;
            const walk = x - startX;
            list.scrollLeft = scrollLeft - walk;
        } else {
            const y = e.pageY - list.offsetTop;
            const walk = y - startY;
            list.scrollTop = scrollTop - walk;
        }

        handleScrollLoop();
    });

    for (const face of faces) {
        face.addEventListener('click', () => {
            const id = face.getAttribute('data-character-face');
            const info = document.querySelector(`[data-character-id="${id}"]`);
            const overlay = face.querySelector('.characters__main__list__item__overlay');

            hideAllInfo();
            hideAllOverlay();

            info.classList.add('characters__info__list__item--is-active');
            overlay.classList.add('characters__main__list__item__overlay--is-active');
        });
    }

    window.addEventListener('resize', () => {
        list.style.cursor = 'grab';
    });
}
