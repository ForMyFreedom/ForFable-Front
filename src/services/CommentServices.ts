import { ApiResponse, CommentEntity, CommentInsert, CommentsController, CommentsWithAnswers, PaginationData, WithUsers } from '../../ForFable-Domain';
import { requestApi } from "./_Requester";

export class CommentServices implements CommentsController {
  async update(commentId: number, body: Partial<CommentInsert>): Promise<ApiResponse<CommentEntity>> {
    return await requestApi(`/comment/${commentId}`, 'PUT', body)
  }

  async destroy(commentId: number): Promise<ApiResponse<CommentEntity>> {
    return await requestApi(`/comment/${commentId}`, 'DELETE', undefined)
  }

  async indexByWrite(writeId: number, page: number = 1, limit: number = 20): Promise<ApiResponse<WithUsers<PaginationData<CommentsWithAnswers>>>> {
    return await requestApi(`/comment-by-write/${writeId}?page=${page}&limit=${limit}`, 'GET', undefined)
  }

  async store(body: CommentInsert): Promise<ApiResponse<CommentEntity>> {
    return await requestApi(`/comment`, 'POST', body)
  }
}
