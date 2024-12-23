import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiService = createService(API_URL);


export const fetchCart = async() => {
    try {
        const response = await apiService.get('/cart');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
}

export const addToCart = async(data) => {
    try {
        const response = await apiService.post('/cart/products', data);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add product cart');
    }
}

export const updateCartProduct = async(cartProductId, data) => {
    try {
        const response = await apiService.patch(`/cart/products/${cartProductId}`, data);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update product cart');
    }
}

export const deleteCartProduct = async(cartProductId) => {
    try {
        const response = await apiService.delete(`/cart/products/${cartProductId}`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete product cart');
    }
}