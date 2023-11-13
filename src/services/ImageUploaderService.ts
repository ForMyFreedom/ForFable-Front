import { ImageFolders, ImagesController } from "../../ForFable-Domain/usecases/ImageUsecase";
import { compressImage } from "../utils/image";
import { requestApi } from "./_Requester";
import { ApiResponse, UserEntity } from "../../ForFable-Domain";

export async function CompressOrNot(user: UserEntity, file: File, maxSizeInBythes: number): Promise<File> {
    if(user.isPremium || file.size <= maxSizeInBythes) {
        return file
    } else {
        return await compressImage(file, maxSizeInBythes)
    }
}

export class ImageService implements ImagesController {
    async updateUserImage(file: File): Promise<ApiResponse<string>> {
        const multiPart: FormData = new FormData()
        multiPart.append('image', file)
        return await requestApi('/post-image/user', 'POST', multiPart, true, true)
    }

    async postImage(file: File, folder: Omit<ImageFolders, 'user'>): Promise<ApiResponse<string>> {
        const multiPart: FormData = new FormData()
        multiPart.append('image', file)
        multiPart.append('folder', folder as string)
        return await requestApi('/post-image', 'POST', multiPart, true, true)
    }
    
    async restore(_path: string): Promise<File | undefined> {
        // Service not used
        return undefined
    }
}