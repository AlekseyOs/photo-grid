document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img[data-src][loading="lazy"]');

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(onIntersection);

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
            console.log('observe', lazyImage);
        });
    } else {
        loadImagesImmediately(lazyImages);
    }

    setupToggleButtons();
});

function onIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute('loading');
            observer.unobserve(lazyImage);
        }
    });
}

function loadImagesImmediately(images) {
    images.forEach(function(image) {
        image.src = image.dataset.src;
        image.removeAttribute('loading');
    });
}

function setupToggleButtons() {
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', () => {
            const overlay = button.nextElementSibling;
            overlay.classList.toggle('visible');
            button.textContent = overlay.classList.contains('visible') ? 'Скрыть описание' : 'Показать описание';
        });
    });
}