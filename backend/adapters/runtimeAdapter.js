import BOMAdapter from "./runtime/BOMAdapter.js";
import DepartmentAdapter from "./runtime/departmentAdapter.js";
import InventoryAdapter from "./runtime/inventoryAdapter.js";
import MaterialAdapter from "./runtime/materialAdapter.js";
import MilestoneAdapter from "./runtime/milestoneAdapter.js";
import ProcurementAdapter from "./runtime/procurementAdapter.js";
import ProjectAdapter from "./runtime/projectAdapter.js";
import PurchaseOrderAdapter from "./runtime/purchaseOrderAdapter.js";
import QualityInspectionAdapter from "./runtime/qualityInspectionAdapter.js";
import ShipmentAdapter from "./runtime/shipmentAdapter.js";
import SupplierQuoteAdapter from "./runtime/suplierQuoteAdapter.js";
import SupplierAdapter from "./runtime/supplierAdapter.js";
import WarehouseAdapter from "./runtime/wareHouseAdapter.js";
import WorkOrderAdapter from "./runtime/workOrderAdapter.js";

export default class RuntimeAdapter {
    static adapt(runtimeModel) {
        const state = {};
        for (const [id, entityState] of runtimeModel.state) {
            state[id] = this.adaptState(entityState);
        }
        return {
            graph: {
                nodes: runtimeModel.graph.getAllNodes(),
                edges: runtimeModel.graph.getAllEdges()
            },
            state
        };
    }



    static adaptState(state) {
         const runtimeState = {
            status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
        };
            

        switch (state.entityType) {

            case "PROJECT":
                return ProjectAdapter.adapt(state);
                
            case "MILESTONE":
                return MilestoneAdapter.adapt(state);

            case "INVENTORY":
                return InventoryAdapter.adapt(state);

            case "SUPPLIER":
                return SupplierAdapter.adapt(state);

            case "SHIPMENT":
                return ShipmentAdapter.adapt(state);

            case"SUPPLIER_QUOTE":
                return SupplierQuoteAdapter.adapt(state);

            case "PURCHASE_ORDER":
                return PurchaseOrderAdapter.adapt(state);

            case "QUALITY_INSPECTION":
                return QualityInspectionAdapter.adapt(state);

            case "BOM":
                return BOMAdapter.adapt(state);

            case "DEPARTMENT":
               return DepartmentAdapter.adapt(state);

            case "MATERIAL":
               return MaterialAdapter.adapt(state);

            case "PROCUREMENT":
               return ProcurementAdapter.adapt(state);

            case "WAREHOUSE":
               return WarehouseAdapter.adapt(state);

            case "WORK_ORDER":
               return WorkOrderAdapter.adapt(state);

            default:
                return runtimeState;
        }

    }

}