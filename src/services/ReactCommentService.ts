import { ApiResponse, CleanReactionResponse, CommentEntity, CommentReactionEntity, CommentReactionInsert, ReactCommentsController } from "../../ForFable-Domain";
import { requestApi } from "./_Requester";

export class ReactCommentsService implements ReactCommentsController {
    async show(commentId: CommentEntity['id']): Promise<ApiResponse<CleanReactionResponse>> {
        return await requestApi(`/react-comment/${commentId}`, 'GET', undefined)
    }

    async store(body: CommentReactionInsert): Promise<ApiResponse<CommentReactionEntity>> {
        return await requestApi(`/react-comment`, 'POST', body)
    }

    async destroy(reactCommentId: CommentReactionEntity['id']): Promise<ApiResponse<CommentReactionEntity>> {
        return await requestApi(`/react-comment/${reactCommentId}`, 'DELETE', undefined)
    }
}