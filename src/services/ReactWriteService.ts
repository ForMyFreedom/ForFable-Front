import { ApiResponse, CleanReactionResponse, ReactWritesController, WriteReactionEntity, WriteReactionInsert } from "../../ForFable-Domain";
import { requestApi } from "./_Requester";

export class ReactWriteService implements ReactWritesController {
    async store(body: WriteReactionInsert): Promise<ApiResponse<WriteReactionEntity>> {
        return await requestApi(`/react-write`, 'POST', body)
    }

    async destroy(reactionId: number): Promise<ApiResponse<WriteReactionEntity>> {
        return await requestApi(`/react-write/${reactionId}`, 'DELETE', undefined)
    }

    async show(writeId: number): Promise<ApiResponse<CleanReactionResponse>> {
        return await requestApi(`/react-write/${writeId}`, 'GET', undefined)
    }
}