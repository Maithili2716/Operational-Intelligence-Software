import express from "express";
import cors from "cors";

import Builder from "./runtime/operationalModelBuilder.js";
import RuntimeAdapter from "./adapters/runtimeAdapter.js";
import AttentionAdapter from "./adapters/attentionAdapter.js";
import {generateAttention} from "./engines/attentionEngine/attentionEngine.js";
import ActionAdapter from "./adapters/actionAdapter.js";
import { generateActions } from "./engines/actionEngine/actionEngine.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get("/runtime", async (req, res) => {
    const runtime = await Builder.build();
    res.json({
        success:true,
        data:RuntimeAdapter.adapt(runtime)
    });
});

app.get("/attention", async (req, res) => {
    const runtime = await Builder.build();
    const attention =
        generateAttention(runtime);
    res.json({
        success: true,
        data: AttentionAdapter.adapt(attention)
    });
});

app.get("/action", async (req, res) => {
    const runtime = await Builder.build();
    const action =
        generateActions(runtime);
    res.json({
        success: true,
        data: ActionAdapter.adapt(action)
    });
});



export default app;