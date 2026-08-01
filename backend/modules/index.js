import DepartmentModule from "./department/index.js"
import SupplierModule from "./suppliers/index.js"
import MaterialModule from "./material/index.js"
import WarehouseModule from "./warehouse/index.js"
import ProjectModule from "./projects/index.js"
import MilestoneModule from "./milestone/index.js"
import BOMModule from "./BOM/index.js"
import ProcurementModule from "./procurement/index.js"
import PurchaseOrderModule from "./orders/index.js"
import SupplierQuoteModule from "./supplierQuote/index.js"
import ShipmentModule from "./shipment/index.js"
import QualityInspectionModule from "./quality/index.js"
import InventoryModule from "./inventory/index.js"
import WorkOrderModule from "./workOrder/index.js"

/*
Load order matters.
Master entities must be loaded before
operational entities because Graph.addEdge()
requires both nodes to already exist.
Whenever a new module is added,
place it after every entity it depends on.
*/

const modules = [
    // Master entities
    DepartmentModule,
    SupplierModule,
    MaterialModule,
    WarehouseModule,

    // Core operational entities
    ProjectModule,
    MilestoneModule,
    BOMModule,
    ProcurementModule,
    PurchaseOrderModule,
    ShipmentModule,
    QualityInspectionModule,
    WorkOrderModule,
    InventoryModule,
    SupplierQuoteModule

];

export default modules;