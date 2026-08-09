import { api } from "./client";

export async function getAction() {
    return api("/action");
}