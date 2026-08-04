import { useState } from "react";
import { getInspection } from "../api/inspectionApi";
import { getExecution } from "../api/executionApi";

export default function useInspectionExecution() {
    // =========================================
    // Inspection
    // =========================================
    const [inspection, setInspection] = useState(null);
    const [inspectionLoading, setInspectionLoading] =
        useState(false);
    const [inspectionError, setInspectionError] =
        useState(null);
    // =========================================
    // Execution
    // =========================================
    const [execution, setExecution] = useState(null);
    const [executionLoading, setExecutionLoading] =
        useState(false);
    const [executionError, setExecutionError] =
        useState(null);
    // =========================================
    // Load Inspection
    // =========================================
    async function loadInspection(attentionId) {
        try {
            setInspectionLoading(true);
            setInspectionError(null);
            const response =
              await getInspection(attentionId);
            if (!response.success) {
                throw new Error(
                    response.error?.message ??
                    "Failed to load inspection."
                );
            }
            setInspection(response.data);
            // Only one panel active
            setExecution(null);
        }
        catch (err) {
            setInspectionError(err);
        }
        finally {
            setInspectionLoading(false);
        }
    }
    // =========================================
    // Load Execution
    // =========================================
    async function loadExecution(actionId) {
        try {
            setExecutionLoading(true);
            setExecutionError(null);
            const response =
                await getExecution(actionId);
            if (!response.success) {
                throw new Error(
                    response.error?.message ??
                    "Failed to load execution."
                );
            }
            setExecution(response.data);
            // Only one panel active
            setInspection(null);
        }
        catch (err) {
            setExecutionError(err);
        }
        finally {
            setExecutionLoading(false);
        }
    }
    // =========================================
    // Clear
    // =========================================
    function clearInspection() {
        setInspection(null);
        setInspectionError(null);
    }
    function clearExecution() {
        setExecution(null);
        setExecutionError(null);
    }
    function clearPanel() {
        clearInspection();
        clearExecution();
    }
    return {
        inspection,
        inspectionLoading,
        inspectionError,
        loadInspection,
        clearInspection,
        execution,
        executionLoading,
        executionError,
        loadExecution,
        clearExecution,
        clearPanel
    };
}