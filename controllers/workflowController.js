const { generateWorkflowId } = require('../idGenerator');
const db = require('../models');
const Workflow = db.Workflow;

// create and save Workflows
const createWorkflow = async( req, res ) => {
    try{
        const { issueId, status, updatedBy } = req.body;
        const workflow = {
            workflowId: generateWorkflowId(), 
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

// get Workflow data
const getWorkflow = async( req, res ) => {
    try{
        const workflow = await Workflow.findAll();
        if(!workflow) {
            return res.status(404).json({ message: 'Workflow data not found.' });
        }
        return res.status(200).json({
            workflowData: workflow,
            message: 'Workflow data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching workflow."
        })
    }
};

// get Workflow data by Issue Id
const getWorkflowByIssueId = async( req, res ) => {
    try{
        const { issueId } = req.params;
        const workflow = await Workflow.findOne({ where: {issueId} });
        if(!workflow) {
            return res.status(404).json({ message: 'Workflow data not found.' });
        }
        return res.status(200).json({
            workflowData: workflow,
            message: 'Workflow data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching workflow."
        })
    }
}

// get Workflow data by Status
const getWorkflowByStatus = async( req, res ) => {
    try{
        const { status } = req.params;
        const workflow = await Workflow.findOne({ where: {status} });
        if(!workflow) {
            return res.status(404).json({ message: 'Workflow data not found.' });
        }
        return res.status(200).json({
            workflowData: workflow,
            message: 'Workflow data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching workflow."
        })
    }
}


module.exports = { createWorkflow, getWorkflow, getWorkflowByIssueId, getWorkflowByStatus };