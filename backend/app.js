import express from "express";
import cors from "cors";

import Builder from "./runtime/operationalModelBuilder.js";
import RuntimeAdapter from "./adapters/runtimeAdapter.js";
import AttentionAdapter from "./adapters/attentionAdapter.js";
import {generateAttention} from "./engines/attentionEngine/attentionEngine.js";
import ActionAdapter from "./adapters/actionAdapter.js";
import { generateActions } from "./engines/actionEngine/actionEngine.js";
import { generateInspections } from "./services/inspection/inspectionEngine.js";
import InspectionAdapter from "./adapters/inspectionAdapter.js";
import { generateExecutions } from "./services/execution/executionEngine.js";
import ExecutionAdapter from "./adapters/executionAdapter.js";
import commitRoute
    from "./routes/commitRoute.js";


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

app.get("/inspection", async (req, res) => {
    try {
        const runtime =
            await Builder.build();
        const attention =
            generateAttention(
                runtime
            );
        const inspections =
            generateInspections(
                attention,
                runtime
            );
        res.json({
            success: true,
            data:
                InspectionAdapter.adapt(
                    inspections
                )
        });
    } catch (error) {
        console.error(
            "GET /inspection error:",
            error
        );
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/execution", async (req, res) => {
    try {
        const runtime =
            await Builder.build();
        const actions =
            generateActions(
                runtime
            );
        const executions =
            generateExecutions(
                runtime, actions
            );
        res.json({
            success: true,
            data:
                ExecutionAdapter.adapt(
                    executions
                )
        });
    } catch (error) {
        console.error(
            "GET /execution error:",
            error
        );
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.use("/commit",commitRoute);



export default app;