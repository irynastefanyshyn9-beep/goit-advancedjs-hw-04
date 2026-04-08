import axios from 'axios';

const API_KEY = '55274437-2a8c9d4d1632f9e1aa043681a';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,        
            per_page: 15,  
        }
    });
    return response.data;
}