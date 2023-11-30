import { ApiResponse, ExceptionContract } from "../../ForFable-Domain"

type Method = 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'

export async function requestApi<T>(url: string, method: Method, body?: object, isMultiPart: boolean = false): Promise<ApiResponse<T>> {
    try {
        const BASE_API = window.env.API_URL

        const headers: HeadersInit = {}

        if (!isMultiPart) {
            headers['Content-Type'] = 'application/json'
        }
        const user: string|null = localStorage.getItem('user')
        if(user) {
            headers['Authorization'] = `Bearer ${JSON.parse(user).token}`
        }

        const init: RequestInit = { method: method, headers: headers }
        if(body) { init.body = isMultiPart ? body as BodyInit : JSON.stringify(body) }
        const response = await fetch(BASE_API + url, init);

        const res = await response.json() as ApiResponse<T>;

        if(res.state=='Failure' && res.error == 'Unauthenticated') {
            localStorage.removeItem('user')
            window.location.href = '/'
        }

        return res
    } catch (error) {
        console.log('Error: ', url, '   ', method)
        console.log(body)
        return { state: 'Failure', error: (error as Error).message as keyof ExceptionContract };
    }
}
