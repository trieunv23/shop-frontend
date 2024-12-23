import { API_URL } from "../../../constants/config";
import { createService } from "./../axios";

const apiService = createService(API_URL);

export const fetchProducts = async () => {
    try {
        const response = await apiService.get('/admin/products');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
}

export const createProduct = async (data) => {
    try {
        const response = await apiService.post('/admin/products/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || 'Failed to create product');
    }
}