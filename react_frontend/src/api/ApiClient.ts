import axios, {AxiosInstance, AxiosResponse} from "axios";

import {ApiList} from "../models/ApiList";
import {ApiMainResponse} from "../models/ApiMainResponse";

export class ApiClient {
    protected constructor() {

    }

    private static baseApiUrl = "http://localhost:8000/shop/"

    private static instance: AxiosInstance = (() => {
        const axiosInstance = axios.create({
            baseURL: ApiClient.baseApiUrl,
            headers: {
                'Access-Control-Allow-Origin': true,
            }
        });
        axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: any) => Promise.reject(error),
        );
        return axiosInstance;
    })();

    protected static getListOfItems = async <T>(urlSuffix: string): Promise<T[]> => {
        const response: ApiMainResponse<ApiList<T>> = await ApiClient.instance.get(urlSuffix);
        const responseData: ApiList<T> = response.data;
        return responseData.results;
    }

    protected static getSingleItem = async <T>(urlSuffix: string): Promise<T> => {
        const response: ApiMainResponse<T> = await ApiClient.instance.get(urlSuffix);
        return response.data;
    }

    protected static postSingleItem = async<T>(urlSuffix: string, itemInstance: T): Promise<T> => {
        const response: ApiMainResponse<T> = await ApiClient.instance.post(urlSuffix, itemInstance);
        return response.data;
    }
}