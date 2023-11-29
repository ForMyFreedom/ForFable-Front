import { ApiResponse, GenreEntity, GenreInsert, GenresController, Pagination } from "../../ForFable-Domain"
import { requestApi } from "./_Requester";

export class GenreServices implements GenresController {
    async store(body: GenreInsert): Promise<ApiResponse<GenreEntity>> {
        return await requestApi('/genre', 'POST', body)
    }

    async index(): Promise<Pagination<GenreEntity>> {
        return await requestApi('/genre', 'GET', undefined)
    }

    async show(genreId: number): Promise<ApiResponse<GenreEntity>> {
        return await requestApi(`/genre/${genreId}`, 'GET', undefined)
    }

    async update(genreId: number, body: Partial<GenreInsert>): Promise<ApiResponse<GenreEntity>> {
        return await requestApi(`/genre/${genreId}`, 'PATCH', body)
    }

    async destroy(genreId: number): Promise<ApiResponse<GenreEntity>> {
        return await requestApi(`/genre/${genreId}`, 'DELETE', undefined)
    }

    async storeWords(genreId: number, words: string[]): Promise<ApiResponse<GenreEntity>> {
        return await requestApi(`/genre/${genreId}/word`, 'POST', {words: words})
    }
}
