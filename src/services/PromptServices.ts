import { ApiResponse, Pagination, PromptEntity, PromptInsert, GainControlOverDailyPromptInsert, PromptsController } from '../../ForFable-Domain';
import { requestApi } from "./_Requester";

export class PromptServices implements PromptsController {
  async index(): Promise<Pagination<PromptEntity>> {
    return await requestApi('/prompt', 'GET', undefined, false)
  }

  async show(promptId: PromptEntity['id']): Promise<ApiResponse<PromptEntity>>{
    return await requestApi(`/prompt/${promptId}`, 'GET', undefined, false)
  }

  async store(body: PromptInsert): Promise<ApiResponse<PromptEntity>> {
    return await requestApi('/prompt', 'POST', body, true)
  }

  async update(promptId: PromptEntity['id'], partialPrompt: Partial<PromptInsert>): Promise<ApiResponse<PromptEntity>> {
    return await requestApi(`/prompt/${promptId}`, 'PATCH', partialPrompt, true)
  }

  async destroy(promptId: PromptEntity['id']): Promise<ApiResponse<PromptEntity>> {
    return await requestApi(`/prompt/${promptId}`, 'DELETE', undefined, true)
  }

  async appropriateDailyPrompt(promptId: PromptEntity['id'], body: GainControlOverDailyPromptInsert): Promise<ApiResponse<PromptEntity>> {
    return await requestApi(`/prompt/${promptId}/gain-control`, 'POST', body, true)
  }
}
