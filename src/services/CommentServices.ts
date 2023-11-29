import { ApiResponse, CommentEntity, CommentInsert, CommentsController, EstruturatedCommentsWithAnswers, PaginationData, WithUsers } from '../../ForFable-Domain';
import { requestApi } from "./_Requester";

export class CommentServices implements CommentsController {
  async update(commentId: number, body: Partial<CommentInsert>): Promise<ApiResponse<CommentEntity>> {
    return await requestApi(`/comment/${commentId}`, 'PATCH', body)
  }

  async destroy(commentId: number): Promise<ApiResponse<CommentEntity>> {
    return await requestApi(`/comment/${commentId}`, 'DELETE', undefined)
  }

  async indexByWrite(writeId: number, page: number = 1, limit: number = 20): Promise<ApiResponse<WithUsers<PaginationData<EstruturatedCommentsWithAnswers>>>> {
    return await requestApi(`/comment-by-write/${writeId}?page=${page}&limit=${limit}`, 'GET', undefined)
  }

  async store(body: CommentInsert): Promise<ApiResponse<CommentEntity>> {
    return await requestApi(`/comment`, 'POST', body)
  }
}
