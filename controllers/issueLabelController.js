const db = require('../models');
const IssueLabel = db.IssueLabel;

// create and save Issue Label
const createIssueLabel = async( req, res ) => {
    try{
        const { issueId, labelId } = req.body;
        const issuelabel = {
            issueId, 
            labelId
        };

        // Save IssueLabel
        const issueLabel = await IssueLabel.create(issuelabel);
        return res.status(200).json({
            Issuelabel: issueLabel,
            message: 'Issuelabel data stored successfully'
        });
    } catch (err){
        res.status(500).json({
            message: err.message || "Some error occurred while storing Issuelabel."
        });
    }
};


module.exports = { createIssueLabel };