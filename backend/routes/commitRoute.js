import express from "express";

import {
    commitInspection,
    commitExecution
} from "../services/commit/commitEngine.js";


const router =
    express.Router();


router.post("/", async (req, res) => {

    try {

        const {
            source,
            sourceId,
            updates
        } = req.body;


        if (!source) {

            return res.status(400).json({

                success: false,

                error: {
                    message:
                        "Commit source is required."
                }

            });

        }


        if (!sourceId) {

            return res.status(400).json({

                success: false,

                error: {
                    message:
                        "Commit sourceId is required."
                }

            });

        }


        if (!Array.isArray(updates)) {

            return res.status(400).json({

                success: false,

                error: {
                    message:
                        "Commit updates must be an array."
                }

            });

        }


        let result;


        // =====================================
        // INSPECTION
        // =====================================

        if (source === "INSPECTION") {

            result =
                await commitInspection({

                    id:
                        sourceId,

                    mitigationStrategy: {

                        updates

                    }

                });

        }


        // =====================================
        // ACTION EXECUTION
        // =====================================

        else if (
            source === "ACTION_EXECUTION"
        ) {

            result =
                await commitExecution({

                    id:
                        sourceId,

                    executionPlan: {

                        updates

                    }

                });

        }


        else {

            return res.status(400).json({

                success: false,

                error: {
                    message:
                        `Unsupported commit source: ${source}`
                }

            });

        }


        return res.json({

            success: true,

            data: result

        });

    }

    catch (error) {

        console.error(
            "Commit error:",
            error
        );


        /*
         * A conflict is represented by
         * our currentValue validation.
         *
         * For v1 we return 409 for any
         * commit conflict.
         */

        const isConflict =
            error.message?.includes(
                "changed before commit"
            );


        if (isConflict) {

            return res.status(409).json({

                success: false,

                error: {

                    code:
                        "COMMIT_CONFLICT",

                    message:
                        error.message

                }

            });

        }


        return res.status(500).json({

            success: false,

            error: {

                message:
                    error.message ??
                    "Commit failed."

            }

        });

    }

});


export default router;