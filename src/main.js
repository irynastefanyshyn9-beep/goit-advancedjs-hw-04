import { getImagesByQuery } from './js/pixabay-api.js';
import { 
    createGallery, 
    clearGallery, 
    showLoader, 
    hideLoader, 
    showLoadMoreButton, 
    hideLoadMoreButton 
} from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('#search-form');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const searchInput = event.currentTarget.elements['search-text'];
    const currentQuery = searchInput.value.trim();

    if (!currentQuery) {
        iziToast.warning({ 
            message: "Please enter a search query!", 
            position: 'topRight' 
        });
        return;
    }

    query = currentQuery;
    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        totalHits = data.totalHits;

        if (!data.hits || data.hits.length === 0) {
            iziToast.error({ 
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight'
            });
            return;
        }

        createGallery(data.hits);
        checkLoadMoreStatus();
        form.reset();
    } catch (error) {
        iziToast.error({ message: "Something went wrong. Try again!" });
    } finally {
        hideLoader();
    }
});

const loadMoreBtn = document.querySelector('#load-more'); 

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);

        const galleryItem = document.querySelector('.gallery-item');
        if (galleryItem) {
            const { height: cardHeight } = galleryItem.getBoundingClientRect();
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        }

        checkLoadMoreStatus();
    } catch (error) {
        iziToast.error({ message: "Failed to load more images!" });
    } finally {
        hideLoader();
    }
});

function checkLoadMoreStatus() {
    const totalPages = Math.ceil(totalHits / 15);
    
    if (page >= totalPages) {
        hideLoadMoreButton();
        if (totalHits > 0 && page > 1) {
            iziToast.info({ 
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
        }
    } else {
        showLoadMoreButton();
    }
}