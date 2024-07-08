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


module.exports = { createLabel };