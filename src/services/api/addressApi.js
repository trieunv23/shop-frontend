import axios from "axios";
import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiClient = axios.create({
    baseURL: API_URL,
});

const apiService = createService(API_URL);

export const fetchAddresses = async () => {
    try {
        const response = await apiService.get('/user/addresses');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch addresses');
    }
}

export const fetchAddress = async (addressId) => {
    try {
        const response = await apiService.get(`/user/addresses/${addressId}`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch address');
    }
}

export const fetchDefaultAddress = async () => {
    try {
        const response = await apiService.get('/user/addresses/default');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch address');
    }
}

export const updateDefaultAdress = async (addressId) => {
    try {
        await axios.post(
            `${API_URL}/update-default-address`, 
            { address_id: addressId }, 
            { withCredentials: true }
        );

        return true;
    } catch (error) {
        throw new Error('Failed to change default address');
    }
}

export const createAddress = async (data) => {
    try {
        await apiClient.post('create-address', data, {
            withCredentials: true
        });

        return true;
    } catch (error) {
        throw new Error('Failed to create address');
    }
}

export const updateAddress = async (data) => {
    try {
        await apiClient.put('update-address', data, {
            withCredentials: true
        });

        return true;
    } catch (error) {
        throw new Error('Failed to update address');
    }
}


export const deleteAddress = async (addressId) => {
    try {
        await axios.post(
            `${API_URL}/delete-address`, 
            { address_id: addressId }, 
            { withCredentials: true }
        );

        return true;
    } catch (error) {
        throw new Error('Failed to delete address');
    }
}

const apiProvincesOpenApi = axios.create({
    baseURL: 'https://provinces.open-api.vn/api',
});

export const fetchProvinces = async () => {
    try {
        const response = await apiProvincesOpenApi.get('/p/');

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch provinces');
    }
}

export const fetchDistricts = async (provinceId) => {
    try {
        const response = await apiProvincesOpenApi.get(`/p/${provinceId}?depth=2`);

        return response.data.districts;
    } catch (error) {
        throw new Error('Failed to fetch districts');
    }
}

export const fetchWards = async (districtId) => {
    try {
        const response = await apiProvincesOpenApi.get(`/d/${districtId}?depth=2`);

        return response.data.wards;
    } catch (error) {
        throw new Error('Failed to fetch wards');
    }
}

export const fetchProvince = async (provinceId) => {
    try {
        const response = await apiProvincesOpenApi.get(`/p/${provinceId}`);

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch province');
    }
}

export const fetchDistrict = async (districtId) => {
    try {
        const response = await apiProvincesOpenApi.get(`/d/${districtId}`);

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch district');
    }
}

export const fetchWard = async (wardId) => {
    try {
        const response = await apiProvincesOpenApi.get(`/w/${wardId}`);

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch ward');
    }
}