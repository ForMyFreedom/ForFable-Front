import { ApiResponse, LoginController, UserWithToken } from "../../ForFable-Domain";
import { requestApi } from "./_Requester";

export class LoginServices implements LoginController {
    async loginByCredential(usename: string, password: string): Promise<ApiResponse<UserWithToken>>  {
        const response = await requestApi('/login', 'POST',
            { identify: usename, password: password }
        )
        if(response.data) {
            const user = response.data as UserWithToken
            localStorage.setItem('user', JSON.stringify(user))
            return {data: user}
        } else {
            return { error: response.error }
        }
    }
}
