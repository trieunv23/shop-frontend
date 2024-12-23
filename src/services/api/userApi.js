import axios from "axios";
import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiClient = axios.create({
    baseURL: API_URL,
});

const apiService = createService(API_URL);

export const fetchUser = async () => {
    try {
        const response = await apiService.get('/user/profile');

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}

export const updateProfile = async (data) => {
    try {
        await apiClient.put('/update-profile', data, { 
            withCredentials: true 
        });

        return true;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}

export const register = async(data) => {
    try {
        
    } catch (error) {
        
    }
}