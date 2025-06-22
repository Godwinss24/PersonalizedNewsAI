import { aResponse } from "../interfaces/aResponse";

export const createResponse = <T>(data: T, successful: boolean, message: string): aResponse<T> => {
    return { data, successful, message };
}