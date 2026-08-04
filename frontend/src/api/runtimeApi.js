import runtime from "../mocks/runtime.mock.js";
import { success } from "../utils/response";

export async function getRuntime() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(success(runtime));
        }, 300);
    });
}