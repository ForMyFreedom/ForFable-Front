import { FailureApiResponse } from "../../ForFable-Domain";

export function stringifyAppError(error: FailureApiResponse['error']): string {
    if(error) {
        if(typeof error === 'string') return error
        return Object.entries(error)[0][1][0]
    } else {
        return ''
    }
}