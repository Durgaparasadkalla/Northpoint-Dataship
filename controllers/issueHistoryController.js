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

// get Issue History data
const getIssueHistory = async( req, res ) => {
    try{
        const issuehistory = await IssueHistory.findAll();
        if(!issuehistory) {
            return res.status(404).json({ message: 'Issue History data not found.' });
        }
        return res.status(200).json({
            issueHistoryData: issuehistory,
            message: 'Issue History data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching issuehistory."
        })
    }
};

// get Issue History data by Issue Id
const getIssueHistoryByIssueId = async( req, res ) => {
    try{
        const { issueId } = req.params;
        const issuehistory = await IssueHistory.findAll({ where: { issueId } });
        if(!issuehistory) {
            return res.status(404).json({ message: 'Issue History data not found.' });
        }
        return res.status(200).json({
            issueHistoryData: issuehistory,
            message: 'Issue History data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching issuehistory."
        })
    }
};


module.exports = { createIssueHistory, getIssueHistory, getIssueHistoryByIssueId };