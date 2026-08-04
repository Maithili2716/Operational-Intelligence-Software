import inspections from "../mocks/inspection.mock.js";
import { success } from "../utils/response";

export async function getInspection(attentionId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                success(
                    inspections[attentionId]
                )
            );
        }, 300);
    });
}