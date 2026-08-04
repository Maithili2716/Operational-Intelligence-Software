import action from "../mocks/action.mock.js";
import { success } from "../utils/response";

export async function getAction() {

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(success(action));
        }, 300);
    });
}