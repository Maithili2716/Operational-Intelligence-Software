-- ===========================
-- DEPARTMENTS
-- ===========================

INSERT INTO departments(name, head)
VALUES
('Production','Alice'),
('Procurement','Bob');

-- ===========================
-- SUPPLIERS
-- ===========================

INSERT INTO suppliers(name,email,phone,address,status)
VALUES
('ABC Metals','abc@gmail.com','9999999999','Pune','ACTIVE'),
('XYZ Plastics','xyz@gmail.com','8888888888','Mumbai','ACTIVE');

-- ===========================
-- WAREHOUSES
-- ===========================

INSERT INTO warehouses(name,location,capacity)
VALUES
('Main Warehouse','Pune',10000),
('Secondary Warehouse','Mumbai',5000);

-- ===========================
-- MATERIALS
-- ===========================

INSERT INTO materials(material_code,name,description,unit)
VALUES
('MAT001','Steel Rod','Steel Rod','Kg'),
('MAT002','PVC Sheet','PVC Panels','Sheet'),
('MAT003','Copper Wire','Electrical Wire','Meter');

-- ===========================
-- PROJECTS
-- ===========================

INSERT INTO projects(
name,
department_id,
supplier_id,
current_phase,
progress,
status,
due_date,
estimated_completion_date
)
VALUES

(
'Bridge Project',
1,
1,
'Execution',
60,
'ONGOING',
CURRENT_DATE-5,
CURRENT_DATE+10
),

(
'Factory Automation',
2,
2,
'Planning',
15,
'ON HOLD',
CURRENT_DATE+30,
CURRENT_DATE+45
);

-- ===========================
-- MILESTONES
-- ===========================

INSERT INTO milestones(
project_id,
name,
progress,
status,
due_date,
estimated_completion_date
)
VALUES

(
1,
'Foundation',
100,
'COMPLETED',
CURRENT_DATE-20,
CURRENT_DATE-20
),

(
1,
'Steel Structure',
50,
'ONGOING',
CURRENT_DATE-2,
CURRENT_DATE+5
),

(
2,
'Planning',
10,
'ON HOLD',
CURRENT_DATE+20,
CURRENT_DATE+25
);

-- ===========================
-- BOM
-- ===========================

INSERT INTO bom(
project_id,
revision_no,
revision_flag,
owner,
approved_by,
approval_status,
mandatory_fields_complete,
status
)
VALUES

(
1,
2,
TRUE,
'Production',
'Manager',
'APPROVED',
TRUE,
'ONGOING'
),

(
2,
1,
FALSE,
'Procurement',
NULL,
'PENDING',
FALSE,
'PENDING'
);

-- ===========================
-- BOM MATERIALS
-- ===========================

INSERT INTO bom_materials
VALUES

(1,1,200),
(1,2,50),
(2,3,300);

-- ===========================
-- BOM SUPPLIERS
-- ===========================

INSERT INTO bom_suppliers
VALUES

(1,1),
(2,2);

-- ===========================
-- INVENTORY
-- ===========================

INSERT INTO inventory(
material_id,
warehouse_id,
available,
reserved,
required
)
VALUES

(
1,
1,
100,
80,
150
),

(
2,
1,
0,
0,
50
),

(
3,
2,
500,
200,
100
);

-- ===========================
-- PROCUREMENT
-- ===========================

INSERT INTO procurements(
supplier_id,
status,
due_date,
estimated_completion_date
)
VALUES

(
1,
'ONGOING',
CURRENT_DATE+7,
CURRENT_DATE+2
),

(
2,
'FAILED',
CURRENT_DATE-2,
CURRENT_DATE+6
);

-- ===========================
-- PROCUREMENT MATERIALS
-- ===========================

INSERT INTO procurement_materials
VALUES

(1,1,200),
(2,3,100);

-- ===========================
-- PURCHASE ORDERS
-- ===========================

INSERT INTO purchase_orders(
procurement_id,
supplier_id,
status,
due_date,
estimated_completion_date
)
VALUES

(
1,
1,
'ONGOING',
CURRENT_DATE+5,
CURRENT_DATE+6
),

(
2,
2,
'FAILED',
CURRENT_DATE-5,
CURRENT_DATE-2
);

-- ===========================
-- PURCHASE ORDER ITEMS
-- ===========================

INSERT INTO purchase_order_items
VALUES

(1,1,200,500),
(2,3,100,250);

-- ===========================
-- SHIPMENTS
-- ===========================

INSERT INTO shipments(
purchase_order_id,
tracking_number,
expected_delivery,
status
)
VALUES

(
1,
'SHIP001',
CURRENT_DATE+3,
'ONGOING'
),

(
2,
'SHIP002',
CURRENT_DATE-2,
'FAILED'
);

-- ===========================
-- QUALITY
-- ===========================

INSERT INTO quality_inspections(
shipment_id,
status,
good_pieces,
faulty_pieces,
notification_status,
inventory_update_status
)
VALUES

(
1,
'ONGOING',
900,
100,
'PENDING',
'PENDING'
),

(
2,
'FAILED',
600,
400,
'PENDING',
'PENDING'
);

-- ===========================
-- SUPPLIER QUOTES
-- ===========================

INSERT INTO supplier_quotes(
supplier_id,
material_id,
price,
valid_until,
status
)
VALUES

(
1,
1,
500,
CURRENT_DATE+10,
'ONGOING'
),

(
2,
3,
300,
CURRENT_DATE-1,
'FAILED'
);

-- ===========================
-- WORK ORDERS
-- ===========================

INSERT INTO work_orders(
project_id,
progress,
status,
due_date,
estimated_completion_date
)
VALUES

(
1,
40,
'ONGOING',
CURRENT_DATE+2,
CURRENT_DATE+4
),

(
2,
20,
'FAILED',
CURRENT_DATE-3,
CURRENT_DATE-1
);