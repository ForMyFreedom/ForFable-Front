import { ApiResponse } from "../../ForFable-Domain";

export function stringifyAppError(error: ApiResponse<object>['error']): string {
    if(error) {
        if(typeof error === 'string') return error
        return Object.entries(error)[0][1][0]
    } else {
        return ''
    }
}