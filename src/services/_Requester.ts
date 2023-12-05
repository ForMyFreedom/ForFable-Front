/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "../../ForFable-Domain"
import axios, { AxiosRequestConfig } from "axios"


type Method = 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'

export async function requestApi<T>(url: string, method: Method, body?: object, isMultiPart: boolean = false): Promise<ApiResponse<T>> {
    const BASE_API = window.env.API_URL
    const user: string|null = localStorage.getItem('user')
    const headers: HeadersInit = {}

    if (!isMultiPart) {
        headers['Content-Type'] = 'application/json'
    }
    if(user) {
        headers['Authorization'] = `Bearer ${JSON.parse(user).token}`
    }

    const init: AxiosRequestConfig<T|FormData> = {
        url: BASE_API + url,
        method: method,
        headers: headers
    }
    if(body) {
        init.data = body as FormData
    }

    try{
        const response = await axios.request(init);
        return response.data as ApiResponse<T>;
    }catch(e: any){
        const response: ApiResponse<T> = e.response.data
        if(response.state=='Failure' && response.error == 'Unauthorized') {
            localStorage.removeItem('user')
            window.location.href = '/'
        }
    
        return response
    }
}
