# Operational Intelligence Software

A full stack operational intelligence platform that transforms structured operational data into a live semantic model of workflows, dependencies, schedules, resources, and operational state.

The platform detects operational issues, explains their likely causes, identifies affected entities, proposes corrective actions, and provides a controlled workflow for reviewing and committing runtime changes.

## Overview

Operational problems are rarely isolated.

A delayed shipment can affect inventory. Insufficient inventory can block production. A pending approval can delay procurement. A failed dependency can affect downstream milestones.

Traditional dashboards often display these events as separate records. This project models the relationships between operational entities and uses those relationships to understand the current state of the system.

The platform follows this workflow:

Operational Data → Runtime Model → Attention Detection → Inspection → Action / Execution → Controlled Commit

The goal is to move beyond simply showing what is wrong and help answer:

- What happened?
- Why did it happen?
- What entities are affected?
- What can be done?
- Can the proposed change be safely applied?

## Key Features

- Semantic runtime modeling of operational entities
- Dependency aware workflow representation
- Interactive operational graph visualization
- Rule based attention detection
- Root cause analysis
- Affected entity identification
- Proposed runtime updates
- Manual operational actions
- Action execution planning
- Controlled commit workflow
- Optimistic conflict detection
- Cross highlighting between issues, actions, and runtime entities
- Runtime state inspection
- REST based frontend and backend communication

## Architecture

```text
                    Operational Data
                           |
                           v
                  +-------------------+
                  |   Runtime Model   |
                  +---------+---------+
                            |
                            v
                  +-------------------+
                  |  Attention Engine |
                  +---------+---------+
                            |
                            v
                  +-------------------+
                  | Inspection Engine |
                  +---------+---------+
                            |
                            v
                  +-------------------+
                  |    Action Engine  |
                  +---------+---------+
                            |
                            v
                  +-------------------+
                  | Execution Engine  |
                  +---------+---------+
                            |
                            v
                  +-------------------+
                  |   Commit Engine   |
                  +---------+---------+
                            |
                            v
                       PostgreSQL

        
        
        
