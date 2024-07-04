const db = require('../models');
const Attachment = db.Attachment;

// create and save Attachment
const createAttachment = async (req, res) => {
    try {
      const { attachmentId, issueId, uploadedBy } = req.body;
      const files = req.file;
      console.log('files',files);
  
      if (!files) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
    //   const attachment = files.map(file => ({
    //     attachmentId,
    //     issueId,
    //     filePath: file.path,
    //     fileName: file.originalname,
    //     uploadedBy
    //   }));
      const attachment = {
        attachmentId,
        issueId,
        filePath: files.path,
        fileName: files.originalname,
        uploadedBy
      };
  
  
      const createdAttachment = await Attachment.create(attachment);
      console.log('createdAttachment',createdAttachment);
      return res.status(200).json({
        attachment: createdAttachment,
        message: 'Attachment stored successfully'
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while storing the attachment."
      });
    }
};

// get attachments
const getAttachment = async( req, res ) => {
  try{
    const attachments = await Attachment.findAll();
    if (!attachments) {
      return res.status(404).json({ message: 'No file has been uploaded' })
    }
    return res.status(200).json({
       Attachments: attachments,
       message: 'Attachments fetched successfully' })
  } catch (err) {
    console.log({
      message: err.message || "Some error occurred while fetching the attachment."
    });
  }
};


module.exports = { createAttachment, getAttachment };