// =========================================
// Workflow Hook
// Investigation Lifecycle
// =========================================

import { useState } from "react";
import { getInspection }
    from "../api/inspectionApi";
import { getExecution }
    from "../api/executionApi";
import {commitInspection,commitExecution} from "../api/commitApi";

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
   /* async function openInspection(
        attentionId
    ) {
        try {
            setLoading(true);
            setError(null);
            const response =
                await getInspection(
                    attentionId
                );
            console.log("inspection:",response);
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
    };*/

    async function openInspection(attentionId) {
    try {

        setLoading(true);
        setError(null);
        const response =
            await getInspection();
        console.log("inspection response:", response);

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                "Failed to load inspection."
            );
        }
        const selectedInspection =
            response.data?.[attentionId];
        console.log(
            "selected inspection:",
            selectedInspection
        );
        if (!selectedInspection) {
            throw new Error(
                `No inspection found for attention ${attentionId}`
            );
        }
        setInspection(
            selectedInspection
        );
        setWorkflowStage(
            "inspection"
        );

    } catch (err) {
        console.error(
            "Inspection error:",
            err
        );

        setError(err);
    } finally {
        setLoading(false);

    }
}

   /* async function openExecution(actionId) {
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
    }*/

    async function openExecution(actionId) {
    try {
        setLoading(true);
        setError(null);
        const response =
            await getExecution();
        console.log(
            "execution response:",
            response
        );

        if (!response.success) {

            throw new Error(
                response.error?.message ??
                "Failed to load execution."
            );

        }
        const selectedExecution =
            response.data?.[actionId];

        console.log(
            "selected execution:",
            selectedExecution
        );

        if (!selectedExecution) {

            throw new Error(
                `No execution found for action ${actionId}`
            );

        }
        setExecution(
            selectedExecution
        );

        setWorkflowStage(
            "actionExecution"
        );

    }

    catch (err) {
        console.error(
            "Execution error:",
            err
        );
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

    async function beginCommit() {

    try {

        setLoading(true);
        setError(null);
        // =====================================
        // INSPECTION COMMIT
        // =====================================

        if (
            workflowStage === "execution" &&
            inspection
        ) {

            const response =
                await commitInspection(
                    inspection
                );


            if (!response.success) {

                throw new Error(
                    response.error?.message ??
                    "Inspection commit failed."
                );

            }


            setWorkflowStage(
                "committing"
            );
            console.log("commit:",response.data);

            return response.data;
        }

        
        // =====================================
        // ACTION EXECUTION COMMIT
        // =====================================

        if ( workflowStage === "actionExecution" &&
            execution) 
        {
            const response =
                await commitExecution(
                    execution
                );
            if (!response.success) {        
            if (response.error?.code ==="COMMIT_CONFLICT")       
                {
                throw new Error(
            "The runtime changed while you were reviewing this update. " +
            "Please refresh the workspace and inspect the latest state."
        );

    }

    throw new Error(
        response.error?.message ??
        "Commit failed."
    );
            }
            setWorkflowStage(
                "committing"
            );
            return response.data;
        }
        throw new Error(
            "Nothing available to commit."
        );
    }
    catch (err) {
        console.error(
            "Commit error:",
            err
        );
        setError(err);
    }
    finally {
        setLoading(false);
    }
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