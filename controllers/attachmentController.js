const db = require('../models');
const Attachment = db.Attachment;

// get attachments
const getAttachment = async( req, res ) => {
  try{
    const attachments = await Attachment.findAll();
    if (!attachments) {
      return res.status(404).json({ message: 'No file has been uploaded' })
    }
    return res.status(200).json({
       Attachments: attachments,
       message: 'Attachments fetched successfully'
     })
  } catch (err) {
    console.log({
      message: err.message || "Some error occurred while fetching the attachment."
    });
  }
};

// get attachments by issue id
const getAttachmentByIssueId = async( req, res ) => {
  try{
    const { issueId } = req.params;
    const attachments = await Attachment.findOne({ where: {issueId} });
    if (!attachments) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    return res.status(200).json({
      Attachments: attachments,
      message: 'Attachments fetched successfully'
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occurred while fetching the attachment."
    })
  }
}


module.exports = {  getAttachment, getAttachmentByIssueId };