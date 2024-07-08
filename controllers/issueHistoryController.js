const { generateHistoryId } = require('../idGenerator');
const db = require('../models');
const IssueHistory = db.IssueHistory;

// create and save Issue History
const createIssueHistory = async( req, res ) => {
    try{
        const { issueId, userId, changeType, oldValue, newValue } = req.body;
        const issueHistory = {
            historyId: generateHistoryId(), 
            issueId, 
            userId, 
            changeType, 
            oldValue, 
            newValue
        };

        // Save IssueHistory
        const issuehistory = await IssueHistory.create(issueHistory);
        return res.status(200).json({
            IssueHistory: issuehistory,
            message: 'Issue History stored successfully'
        });
    } catch (err){
        res.status(500).json({
            message: err.message || "Some error occurred while storing Issue History."
        });
    }
};


module.exports = { createIssueHistory };