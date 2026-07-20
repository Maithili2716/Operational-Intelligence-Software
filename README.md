# Operational-Intelligence-Software



**Architecture**
                 

                 USER
                   │
                   ▼
             Controllers
                   │
                   ▼
         Application Services
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
 Repositories          Operational Context
        │                     ▲
        │                     │
        └────── PostgreSQL ───┘
