import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiService = createService(API_URL);


export const fetchPayments = async() => {
    try {
        const response = await apiService.get('/orders');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
}

export const fetchOrder = async(orderId) => {
    try {
        const response = await apiService.get(`/orders/${ orderId }`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
}

export const createOrder = async(data) => {
    try {
        const response = await apiService.post('/orders/create', data);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create order');
    }
}
