CREATE DATABASE erp;

-- Connect to erp before executing the remaining statements.
CREATE TABLE departments(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    head VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE suppliers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE warehouses(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location TEXT,
    capacity INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP 
     
);

CREATE TABLE materials(
    id SERIAL PRIMARY KEY,
    material_code VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    description TEXT,
    unit VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department_id INTEGER REFERENCES departments(id),
    supplier_id INTEGER REFERENCES suppliers(id),
    current_phase VARCHAR(100),
    progress INTEGER DEFAULT 0 CHECK(progress >= 0 AND progress <= 100),
    status VARCHAR(20) NOT NULL,
    due_date DATE,
    estimated_completion_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE milestones(
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    name VARCHAR(100),
    number INTEGER DEFAULT 0,
    progress INTEGER DEFAULT 0 CHECK(progress >= 0 AND progress <= 100),
    status VARCHAR(20) NOT NULL,
    due_date DATE,
    estimated_completion_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE bom(
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    revision_no INTEGER,
    revision_flag BOOLEAN,
    owner VARCHAR(100),
    approved_by VARCHAR(100),
    approval_status VARCHAR(30),
    mandatory_fields_complete BOOLEAN,
    status VARCHAR(20) NOT NULL,
    due_date DATE,
    estimated_completion_date DATE,
    created_at TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE inventory(
    id SERIAL PRIMARY KEY,
    material_id INTEGER REFERENCES materials(id),
    warehouse_id INTEGER REFERENCES warehouses(id),
    available INTEGER DEFAULT 0 CHECK(available >= 0),
    reserved INTEGER DEFAULT 0 CHECK(reserved >= 0),
    required INTEGER DEFAULT 0 CHECK(required >= 0),
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE procurements(
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    status VARCHAR(20) NOT NULL,
    due_date DATE,
    estimated_completion_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE purchase_orders(
    id SERIAL PRIMARY KEY,
    procurement_id INTEGER REFERENCES procurements(id),
    supplier_id INTEGER REFERENCES suppliers(id),
    status VARCHAR(20) NOT NULL,
    due_date DATE,
    estimated_completion_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE supplier_quotes(
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    material_id INTEGER REFERENCES materials(id),
    price NUMERIC(12,2),
    valid_until DATE,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipments(
    id SERIAL PRIMARY KEY,
    purchase_order_id INTEGER REFERENCES purchase_orders(id),
    tracking_number VARCHAR(100),
    expected_delivery DATE,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE work_orders(
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    progress INTEGER DEFAULT 0 CHECK(progress >= 0 AND progress <= 100),
    status VARCHAR(20) NOT NULL,
    due_date DATE,
    estimated_completion_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE quality_inspections(
    id SERIAL PRIMARY KEY,
    shipment_id INTEGER REFERENCES shipments(id),
    status VARCHAR(20) NOT NULL,
    good_pieces INTEGER CHECK(good_pieces >= 0),
    faulty_pieces INTEGER CHECK(faulty_pieces >= 0),
    notification_status VARCHAR(20),
    inventory_update_status VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE bom_materials(
    bom_id INTEGER REFERENCES bom(id),
    material_id INTEGER REFERENCES materials(id),
    quantity INTEGER,
    PRIMARY KEY(bom_id,material_id)
);

CREATE TABLE bom_suppliers(
    bom_id INTEGER REFERENCES bom(id),
    supplier_id INTEGER REFERENCES suppliers(id),
    PRIMARY KEY(bom_id,supplier_id)
);

CREATE TABLE procurement_materials(
    procurement_id INTEGER REFERENCES procurements(id),
    material_id INTEGER REFERENCES materials(id),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    PRIMARY KEY(procurement_id, material_id)
);

CREATE TABLE purchase_order_items(
    purchase_order_id INTEGER REFERENCES purchase_orders(id),
    material_id INTEGER REFERENCES materials(id),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    unit_price NUMERIC(12,2) NOT NULL CHECK(unit_price >= 0),
    PRIMARY KEY(purchase_order_id, material_id)
);

CREATE INDEX idx_project_department
ON projects(department_id);

CREATE INDEX idx_project_supplier
ON projects(supplier_id);

CREATE INDEX idx_bom_project
ON bom(project_id);

CREATE INDEX idx_inventory_material
ON inventory(material_id);

CREATE INDEX idx_inventory_warehouse
ON inventory(warehouse_id);

CREATE INDEX idx_milestone_project
ON milestones(project_id);

CREATE INDEX idx_workorder_project
ON work_orders(project_id);

CREATE INDEX idx_shipment_purchase_order
ON shipments(purchase_order_id);

CREATE INDEX idx_quality_shipment
ON quality_inspections(shipment_id);

