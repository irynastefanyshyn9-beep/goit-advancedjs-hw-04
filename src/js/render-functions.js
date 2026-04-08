import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" class="gallery-image" loading="lazy" />
                <div class="info">
                    <div class="info-item"><b>Likes</b><span>${likes}</span></div>
                    <div class="info-item"><b>Views</b><span>${views}</span></div>
                    <div class="info-item"><b>Comments</b><span>${comments}</span></div>
                    <div class="info-item"><b>Downloads</b><span>${downloads}</span></div>
                </div>
            </a>
        </li>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() { 
    gallery.innerHTML = ''; 
}

export function showLoader() { 
    document.querySelector('#loader')?.classList.remove('hidden'); 
}

export function hideLoader() { 
    document.querySelector('#loader')?.classList.add('hidden'); 
}

export function showLoadMoreButton() {
    loadMoreBtn?.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    loadMoreBtn?.classList.add('hidden');
}