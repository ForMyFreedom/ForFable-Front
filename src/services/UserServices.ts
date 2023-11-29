import { ApiResponse, GenericResponse, Pagination, PromptEntityWithWrite, ProposalEntityWithWrite, RestartPasswordInsert, UserEntity, UserInsert, UsersController } from "../../ForFable-Domain"
import { requestApi } from "./_Requester";

export class UserServices implements UsersController {
    async index(page: number=1, limit: number=20): Promise<Pagination<UserEntity>> {
        return await requestApi(`/user?page=${page}&limit=${limit}`, 'GET', undefined)
    }

    async show(userId: UserEntity['id']): Promise<ApiResponse<UserEntity>> {
        return await requestApi(`/user/${userId}`, 'GET', undefined)
    }

    async storeUser(body: UserInsert): Promise<ApiResponse<UserEntity>> {
        return await requestApi('/user', 'POST', body)
    }

    async storeAdmin(body: UserInsert): Promise<ApiResponse<UserEntity>> {
        return await requestApi('/user', 'POST', body)
    }

    async update(userId: UserEntity['id'], partialBody: Partial<UserInsert>): Promise<ApiResponse<UserEntity>> {
        return await requestApi(`/user/${userId}`, 'PUT', partialBody)
    }

    async destroy(userId: UserEntity['id']): Promise<ApiResponse<UserEntity>> {
        return await requestApi(`/user/${userId}`, 'DELETE', undefined)
    }

    async verifyEmail(token: string|undefined): Promise<ApiResponse<boolean>> {
        return await requestApi(`/user/verify-email/${token}`, 'GET', undefined)
    }

    async requestPasswordChange(user: UserEntity|undefined):  Promise<GenericResponse> {
        return await requestApi(`/user/request-password-change`, 'POST', user)
    }

    async restartPassword(token: string|undefined, body: RestartPasswordInsert): Promise<GenericResponse> {
        return await requestApi(`/user/restart-password/${token}`, 'POST', body)
    }

    async indexWritesByAuthor(authorId: number, page: number = 1, limit: number = 3): Promise<Pagination<PromptEntityWithWrite | ProposalEntityWithWrite>> {
        return await requestApi(`/user/${authorId}/writes?page=${page}&limit=${limit}`, 'GET', undefined)
    }
}