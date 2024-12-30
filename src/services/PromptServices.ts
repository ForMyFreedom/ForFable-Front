import { ApiResponse, Pagination, PromptEntity, PromptInsert, GainControlOverDailyPromptInsert, PromptsController, PromptEntityWithWrite, UserEntity, PromptTrail } from '../../ForFable-Domain';
import { requestApi } from "./_Requester";

export class PromptServices implements PromptsController {
  async index(): Promise<Pagination<PromptEntity>> {
    return await requestApi('/prompt', 'GET', undefined)
  }

  async show(promptId: PromptEntity['id']): Promise<ApiResponse<PromptEntityWithWrite>>{
    return await requestApi(`/prompt/${promptId}`, 'GET', undefined)
  }

  async getAuthor(promptId: PromptEntity['id']): Promise<ApiResponse<UserEntity>> {
    return await requestApi(`/prompt/${promptId}/author`, 'GET', undefined);
  }

  async store(body: PromptInsert): Promise<ApiResponse<PromptEntity>> {
    return await requestApi('/prompt', 'POST', body)
  }

  async update(promptId: PromptEntity['id'], partialPrompt: Partial<PromptInsert>): Promise<ApiResponse<PromptEntity>> {
    return await requestApi(`/prompt/${promptId}`, 'PATCH', partialPrompt)
  }

  async destroy(promptId: PromptEntity['id']): Promise<ApiResponse<PromptEntity>> {
    return await requestApi(`/prompt/${promptId}`, 'DELETE', undefined)
  }

  async appropriateDailyPrompt(promptId: PromptEntity['id'], body: GainControlOverDailyPromptInsert): Promise<ApiResponse<PromptEntity>> {
    return await requestApi(`/prompt/${promptId}/gain-control`, 'POST', body)
  }

  async indexByAuthor(authorId: number, page?: number | undefined, limit?: number | undefined): Promise<Pagination<PromptEntity>> {
    return await requestApi(`/prompt/author/${authorId}?page=${page}&limit=${limit}`, 'GET', undefined)
  }

  async trailDefinitives(promptId: number): Promise<ApiResponse<PromptTrail>> {
    return await requestApi(`/prompt/definitives/${promptId}`, 'GET', undefined)
  }
}
