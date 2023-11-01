import { ApiResponse, ExceptionContract } from "../../ForFable-Domain"

type Method = 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'

export async function requestApi<T>(url: string, method: Method, body?: object, withToken: boolean = false): Promise<ApiResponse<T>> {
    try {
        const BASE_API = window.env.API_URL

        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        }

        if(withToken) {
            const token: string|undefined = JSON.parse(localStorage.getItem('user')||'')?.token
            headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(BASE_API + url, {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
        });

        const res = await response.json() as ApiResponse<T>;

        if (!res.error) {
            return { data: res.data };
        } else {
            return { error: res.error };
        }
    } catch (error) {
        console.log('Error: ', url, '   ', method)
        console.log(error)
        return { error: (error as Error).message as keyof ExceptionContract };
    }
}
