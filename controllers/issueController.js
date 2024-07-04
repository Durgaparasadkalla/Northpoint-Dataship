const db = require('../models');
const Issue = db.Issue;

// create and save createIssues
const createIssue = async( req, res ) => {
    try{
        const { issueId, projectId, reporterUserId, assigneeUserId, title, description, status, priority, issueType } = req.body;
        const issue = {
            issueId, 
            projectId, 
            reporterUserId, 
            assigneeUserId, 
            title, 
            description, 
            status, 
            priority, 
            issueType
        };

        // Save Issue
        const Issues = await Issue.create(issue);
        return res.status(200).json({
            Issues: Issues,
            message: 'Issues stored successfully'
        });
    } catch (err){
        res.status(500).json({
            message: err.message || "Some error occurred while storing Issues."
        });
    }
};


module.exports = { createIssue };