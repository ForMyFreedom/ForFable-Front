import { ApiResponse, GenericResponse, Pagination, RestartPasswordInsert, UserEntity, UserInsert, UsersController } from "../../ForFable-Domain";
import { requestApi } from "./_Requester";

export class UserServices implements UsersController {
    async index(page: number=1, limit: number=20): Promise<Pagination<UserEntity>> {
        return await requestApi(`/user?page=${page}&limit=${limit}`, 'GET', undefined, false)
    }

    async show(userId: UserEntity['id']): Promise<ApiResponse<UserEntity>> {
        return await requestApi(`/user/${userId}`, 'GET', undefined, false)
    }

    async storeUser(body: UserInsert): Promise<ApiResponse<UserEntity>> {
        return await requestApi('/user', 'POST', body, false)
    }

    async storeAdmin(body: UserInsert): Promise<ApiResponse<UserEntity>> {
        return await requestApi('/user', 'POST', body, true)
    }

    async update(userId: UserEntity['id'], partialBody: Partial<UserInsert>): Promise<ApiResponse<UserEntity>> {
        return await requestApi(`/user/${userId}`, 'PATCH', partialBody, true)
    }

    async destroy(userId: UserEntity['id']): Promise<ApiResponse<UserEntity>> {
        return await requestApi(`/user/${userId}`, 'DELETE', undefined, true)
    }

    async verifyEmail(token: string|undefined): Promise<ApiResponse<boolean>> {
        return await requestApi(`/user/verify-email/${token}`, 'GET', undefined, true)
    }

    async requestPasswordChange(user: UserEntity|undefined): Promise<ApiResponse<boolean>> {
        return await requestApi(`/user/request-password-change`, 'POST', user, true)
    }

    async restartPassword(token: string|undefined, body: RestartPasswordInsert): Promise<GenericResponse> {
        return await requestApi(`/user/restart-password/${token}`, 'POST', body, true)
    }
}