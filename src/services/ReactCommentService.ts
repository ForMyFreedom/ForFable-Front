import { ApiResponse, CommentEntity, CommentReactionEntity, CommentReactionInsert, ExibitionReaction, ReactCommentsController } from "../../ForFable-Domain";
import { requestApi } from "./_Requester";

export class ReactCommentsService implements ReactCommentsController {
    async show(commentId: CommentEntity['id']): Promise<ApiResponse<ExibitionReaction[]>> {
        return await requestApi(`/react-comment/${commentId}`, 'GET', undefined, false)
    }

    async store(body: CommentReactionInsert): Promise<ApiResponse<CommentReactionEntity>> {
        return await requestApi(`/react-comment`, 'POST', body, true)
    }

    async destroy(reactCommentId: CommentReactionEntity['id']): Promise<ApiResponse<CommentReactionEntity>> {
        return await requestApi(`/react-comment/${reactCommentId}`, 'DELETE', undefined, true)
    }
}