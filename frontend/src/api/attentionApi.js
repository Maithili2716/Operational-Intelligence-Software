import attention from "../mocks/attention.mock.js";
import { success } from "../utils/response";

export async function getAttention() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(success(attention));
        }, 300);
    });
}