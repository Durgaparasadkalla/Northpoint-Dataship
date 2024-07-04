const db = require('../models');
const Workflow = db.Workflow;

// create and save Workflows
const createWorkflow = async( req, res ) => {
    try{
        const { workflowId, issueId, status, updatedBy } = req.body;
        const workflow = {
            workflowId, 
            issueId, 
            status, 
            updatedBy
        };

        // Save Workflow
        const Workflows = await Workflow.create(workflow);
        return res.status(200).json({
            WorkFlows: Workflows,
            message: 'Workflows stored successfully'
        });
    } catch (err){
        res.status(500).json({
            message: err.message || "Some error occurred while storing Workflows."
        });
    }
};


module.exports = { createWorkflow };