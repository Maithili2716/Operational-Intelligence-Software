import { useCallback, useEffect, useState } from "react";

import { getRuntime } from "../api/runtimeApi";
import { getAttention } from "../api/attentionApi";
import { getAction } from "../api/actionApi";

export default function useWorkspace() {
    const [runtime, setRuntime] = useState(null);
    const [attention, setAttention] = useState([]);
    const [action, setAction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadWorkspace = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [
                runtimeResponse,
                attentionResponse,
                actionResponse
            ] = await Promise.all([
                getRuntime(),
                getAttention(),
                getAction()
            ]);
            if (!runtimeResponse.success)
                throw new Error(
                    runtimeResponse.error?.message ??
                    "Failed to load runtime."
                );
            if (!attentionResponse.success)
                throw new Error(
                    attentionResponse.error?.message ??
                    "Failed to load attention."
                );
            if (!actionResponse.success)
                throw new Error(
                    actionResponse.error?.message ??
                    "Failed to load action."
                );
            setRuntime(runtimeResponse.data);
            setAttention(attentionResponse.data);
            setAction(actionResponse.data);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        loadWorkspace();
    }, [loadWorkspace]);
    return {
        runtime,
        attention,
        action,
        loading,
        error,
        refreshWorkspace: loadWorkspace,
        setRuntime,
        setAttention,
        setAction
    };
}