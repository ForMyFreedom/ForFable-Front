import { ApiResponse, FullProposalEntity, Pagination, PromptEntity, ProposalEntity, ProposalInsert, ProposalsController, UserEntity } from '../../ForFable-Domain';
import { requestApi } from "./_Requester";

export class ProposalServices implements ProposalsController {
  async index(): Promise<Pagination<PromptEntity>> {
    return await requestApi('/proposal', 'GET', undefined)
  }

  async indexByPrompt(promptId: PromptEntity['id'], page?: number, limit?: number): Promise<Pagination<ProposalEntity>> {
    return await requestApi(`/proposals-by-prompt/${promptId}?page=${page}&limit=${limit}`, 'GET', undefined)
  }

  async actualIndexByPrompt(promptId: PromptEntity['id']): Promise<Pagination<ProposalEntity>> {
    return await requestApi(`/proposals-by-prompt/${promptId}/actual`, 'GET', undefined)
  }

  async indexByAuthor(authorId: UserEntity['id'], page?: number, limit?: number): Promise<Pagination<ProposalEntity>> {
    return await requestApi(`/proposal/author/${authorId}?page=${page}&limit=${limit}`, 'GET', undefined)
  }

  async show(proposalId: ProposalEntity['id']): Promise<ApiResponse<FullProposalEntity>> {
    return await requestApi(`/proposal/${proposalId}`, 'GET', undefined);
  }

  async store(body: ProposalInsert ): Promise<ApiResponse<ProposalEntity>> {
    return await requestApi('/proposal', 'POST', body);
  }

  async update(proposalId: ProposalEntity['id'], partialBody: Partial<ProposalInsert>): Promise<ApiResponse<ProposalEntity>> {
    return await requestApi(`/proposal/${proposalId}`, 'PATCH', partialBody);
  }

  async destroy(proposalId: ProposalEntity['id']): Promise<ApiResponse<ProposalEntity>> {
    return await requestApi(`/proposal/${proposalId}`, 'DELETE', undefined);
  }

  async getAuthor(proposalId: PromptEntity['id']): Promise<ApiResponse<UserEntity>> {
    return await requestApi(`/proposal/${proposalId}/author`, 'GET', undefined);
  }
}
