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

// get Issue Label data
const getIssueLabel = async( req, res ) => {
    try{
        const issuelabel = await IssueLabel.findAll();
        if(!issuelabel) {
            return res.status(404).json({ message: 'Issue Label data not found.' });
        }
        return res.status(200).json({
            issueLabelData: issuelabel,
            message: 'Issue Label data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching issuelabel."
        })
    }
};

// get Issue Label data by Issue Id
const getIssueLabelByIssueId = async( req, res ) => {
    try{
        const { issueId } = req.params;
        const issuelabel = await IssueLabel.findAll({ where: { issueId } });
        if(!issuelabel) {
            return res.status(404).json({ message: 'Issue Label data not found.' });
        }
        return res.status(200).json({
            issueLabelData: issuelabel,
            message: 'Issue Label data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching issuelabel."
        })
    }
};


module.exports = { createIssueLabel, getIssueLabel, getIssueLabelByIssueId };