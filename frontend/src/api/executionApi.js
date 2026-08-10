import { api } from "./client";

export async function getExecution() {
    return api("/execution");
}