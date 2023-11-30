import { FailureApiResponse } from "../../ForFable-Domain";

export function stringifyAppError(error: FailureApiResponse): string {
    if(error) {
        if(typeof error === 'string') return error
        if(typeof error?.data === 'object' && error?.data !== null) {
            return Object.entries(error.data as object)[0][1][0]
        }
    }
    return ''
}