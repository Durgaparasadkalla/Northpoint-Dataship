const { generateLabelId } = require('../idGenerator');
const db = require('../models');
const Label = db.Label;

// create and save Label
const createLabel = async( req, res ) => {
    try{
        const { labelName } = req.body;
        const label = {
            labelId: generateLabelId(), 
            labelName
        };

        // Save Label
        const labeldata = await Label.create(label);
        return res.status(200).json({
            Label: labeldata,
            message: 'Label stored successfully'
        });
    } catch (err){
        res.status(500).json({
            message: err.message || "Some error occurred while storing Labels."
        });
    }
};

// get Label data
const getLabel = async( req, res ) => {
    try{
        const label = await Label.findAll();
        if(!label) {
            return res.status(404).json({ message: 'Label data not found.' });
        }
        return res.status(200).json({
            labelData: label,
            message: 'Label data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching label."
        })
    }
};

// get Label data by Label Name
const getLabelByLabelName = async( req, res ) => {
    try{
        const { labelName } = req.params;
        const label = await Label.findAll({ where: { labelName } });
        if(!label) {
            return res.status(404).json({ message: 'Label data not found.' });
        }
        return res.status(200).json({
            labelData: label,
            message: 'Label data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching label."
        })
    }
};


module.exports = { createLabel, getLabel, getLabelByLabelName };