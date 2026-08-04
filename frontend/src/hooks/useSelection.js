import { useState } from "react";

export default function useSelection() {
    // =========================================
    // Hover State
    // =========================================
    const [hoveredAttention, setHoveredAttention] =
        useState(null);
    const [hoveredAction, setHoveredAction] =
        useState(null);
    const [hoveredNode, setHoveredNode] =
        useState(null);
    const [hoveredEdge, setHoveredEdge] =
        useState(null);
    // =========================================
    // Selection State
    // =========================================
    const [selectedAttention, setSelectedAttention] =
        useState(null);
    const [selectedAction, setSelectedAction] =
        useState(null);
    const [selectedNode, setSelectedNode] =
        useState(null);

    // =========================================
    // Right Panel State
    // =========================================
    const [isInspectionOpen, setInspectionOpen] =
    useState(false);
    const [isExecutionOpen, setExecutionOpen] =
        useState(false);

    // =========================================
    // Panel Helpers
    // =========================================
    function openInspection(attention) {
        setSelectedAction(null);
        setExecutionOpen(false);
        setSelectedAttention(attention);
        setInspectionOpen(true);
    }
    function closeInspection() {
        setInspectionOpen(false);
        setSelectedAttention(null);
    }
    function openExecution(action) {
        setSelectedAttention(null);
        setInspectionOpen(false);
        setSelectedAction(action);
        setExecutionOpen(true);
    }
    function closeExecution() {
        setExecutionOpen(false);
        setSelectedAction(null);
    }
    // =========================================
    // Node Selection
    // =========================================
    function selectNode(node) {
        setSelectedNode(node);
    }
    function clearNodeSelection() {
        setSelectedNode(null);
    }
    // =========================================
    // Clear Entire Workspace Selection
    // =========================================
    function clearSelection() {
        setSelectedAttention(null);
        setSelectedAction(null);
        setSelectedNode(null);
        setInspectionOpen(false);
        setExecutionOpen(false);
    }
    return {
        // Hover
        hoveredAttention,
        setHoveredAttention,
        hoveredAction,
        setHoveredAction,
        hoveredNode,
        setHoveredNode,
        hoveredEdge,
        setHoveredEdge,
        // Selection
        selectedAttention,
        selectedAction,
        selectedNode,
        selectNode,
        clearNodeSelection,
        // Inspection
        isInspectionOpen,
        openInspection,
        closeInspection,
        // Execution
        isExecutionOpen,
        openExecution,
        closeExecution,
        // Global
        clearSelection
    };
}