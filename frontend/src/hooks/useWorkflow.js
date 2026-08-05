// =========================================
// Workflow Hook
// Investigation Lifecycle
// =========================================

import { useState } from "react";
import { getInspection }
    from "../api/inspectionApi";
import { getExecution }
    from "../api/executionApi";

export default function useWorkflow() {
    // =====================================
    // Workflow
    // =====================================
    const [
        workflowStage,
        setWorkflowStage
    ] = useState(null);

    // null
    // inspection
    // execution
    // committing
    // =====================================
    // Investigation
    // =====================================
    const [
        inspection,
        setInspection
    ] = useState(null);
    const [
        execution,
        setExecution
    ] = useState(null);
    const [
        loading,
        setLoading
    ] = useState(false);
    const [
        error,
        setError
    ] = useState(null);

    // =====================================
    // Open Investigation
    // =====================================
    async function openInspection(
        attentionId
    ) {
        try {
            setLoading(true);
            setError(null);
            const response =
                await getInspection(
                    attentionId
                );
            if (!response.success) {
                throw new Error(
                    response.error?.message ??
                  "Failed to load inspection."
                );
            }
            setInspection(
                response.data
            );
            setWorkflowStage(
                "inspection"
            );
        }
        catch (err) {
            setError(err);

        }
        finally {
            setLoading(false);
        }
    };

    async function openExecution(actionId) {
    try {

        setLoading(true);
        setError(null);

        const response =
            await getExecution(actionId);

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                "Failed to load execution."
            );
        }

        setExecution(response.data);

        setWorkflowStage(
            "actionExecution"
        );

    }
    catch (err) {
        setError(err);
    }
    finally {
        setLoading(false);
    }
    }



    // =====================================
    // Review Changes
    // =====================================

    function reviewChanges() {
        console.log("review")
        setWorkflowStage(
            "execution"
        );
    }

    // =====================================
    // Back To Investigation
    // =====================================

    function backToInspection() {
        setWorkflowStage(
            "inspection"
        );
    }

    // =====================================
    // Commit
    // =====================================

    function beginCommit() {
        setWorkflowStage(
            "committing"
        );
    }

    // =====================================
    // Reset Workflow
    // =====================================
    function resetWorkflow() {
        setInspection(null);
        setWorkflowStage(null);
        setLoading(false);
        setError(null);
        setExecution(null);

    }
    return {
        workflowStage,
        inspection,
        execution,
        loading,
        error,
        openInspection,
        openExecution,
        reviewChanges,
        backToInspection,
        beginCommit,
        resetWorkflow
    };
}