import { ApiResponse, GenreEntity, GenreInsert, GenresController, Pagination } from "../../ForFable-Domain"
import { requestApi } from "./_Requester";

export class GenreServices implements GenresController {
    async store(body: GenreInsert): Promise<ApiResponse<GenreEntity>> {
        return await requestApi('/genre', 'POST', body, true)
    }

    async index(): Promise<Pagination<GenreEntity>> {
        return await requestApi('/genre', 'GET', undefined, true)
    }

    async show(genreId: number): Promise<ApiResponse<GenreEntity>> {
        return await requestApi(`/genre/${genreId}`, 'GET', undefined, true)
    }

    async update(genreId: number, body: Partial<GenreInsert>): Promise<ApiResponse<GenreEntity>> {
        return await requestApi(`/genre/${genreId}`, 'PATCH', body, true)
    }

    async destroy(genreId: number): Promise<ApiResponse<GenreEntity>> {
        return await requestApi(`/genre/${genreId}`, 'DELETE', undefined, true)
    }

    async storeWords(genreId: number, words: string[]): Promise<ApiResponse<GenreEntity>> {
        return await requestApi(`/genre/${genreId}/word`, 'POST', {words: words}, true)
    }
}
