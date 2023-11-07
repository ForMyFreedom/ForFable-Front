import { ApiResponse, ExibitionReaction, ReactWritesController, WriteReactionEntity, WriteReactionInsert } from "../../ForFable-Domain";
import { requestApi } from "./_Requester";

export class ReactWriteService implements ReactWritesController {
    async store(body: WriteReactionInsert): Promise<ApiResponse<WriteReactionEntity>> {
        return await requestApi(`/react-write`, 'POST', body, true)
    }

    async destroy(reactionId: number): Promise<ApiResponse<WriteReactionEntity>> {
        return await requestApi(`/react-write/${reactionId}`, 'DELETE', undefined, true)
    }

    async show(writeId: number): Promise<ApiResponse<ExibitionReaction[]>> {
        return await requestApi(`/react-write/${writeId}`, 'GET', undefined, false)
    }
}