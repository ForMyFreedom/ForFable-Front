import { ApiResponse, ConstantEntity, ConstantsController } from "@/ForFable-Domain";
import { requestApi } from "./_Requester";

export class ConstantsServices implements ConstantsController {
  async show(): Promise<ApiResponse<ConstantEntity>> {
    return await requestApi(`/constants`, 'GET', undefined, true)
  }

  async update(contants: Partial<ConstantEntity>): Promise<ApiResponse<ConstantEntity>> {
    return await requestApi(`/constants`, 'PUT', contants, true)
  }
}
