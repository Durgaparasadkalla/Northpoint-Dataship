const db = require('../models');
const Issue = db.Issue;
const Attachment = db.Attachment;
const Project = db.Project;
const User = db.User;
const ProjectMember = db.ProjectMember;
const {Op} = require('sequelize');
const { generateIssueId, generateAttachmentId } = require('../idGenerator');
const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');

const Bucket_Name = process.env.BUCKET_NAME;
const Bucket_Region = process.env.BUCKET_REGION;
const Access_Key = process.env.ACCESS_KEY;
const Secret_Access_Key = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: Access_Key,
        secretAccessKey: Secret_Access_Key
    },
    region: Bucket_Region
});

async function uploadFileToS3(file) {
    return new Promise(async (resolve, reject) => {
        const fileContent = fs.readFileSync(file.path);
        const fileName = `${uuidv4()}-${file.originalname}`;

        const uploadParams = {
            Bucket: Bucket_Name,
            Key: fileName,
            Body: fileContent,
            ACL: 'public-read',
            ContentType: file.mimetype // Ensure ContentType is set dynamically based on the file type
        };

        try {
            // Upload the file to S3
            await s3.send(new PutObjectCommand(uploadParams));
            // Construct the URL for the uploaded file
            const fileUrl = `https://${Bucket_Name}.s3.${Bucket_Region}.amazonaws.com/${fileName}`;

            resolve(fileUrl);
        } catch (error) {
            reject(error);
        }
    });
};

// create and save createIssues
const createIssue = async( req, res ) => {
    try{
        const { projectId, reporterUserId, assigneeUserId, title, description, status, priority, issueType, parentIssueId, comment } = req.body;

        const issue = await Issue.create({
            issueId: generateIssueId(),
            projectId,
            reporterUserId,
            assigneeUserId,
            title,
            description,
            status,
            priority,
            issueType,
            parentIssueId,
            comment
        });

        if (req.files) {
            for (const file of req.files) {
                const attachmentUrl = await uploadFileToS3(file);

                await Attachment.create({
                    attachmentId: generateAttachmentId(),
                    issueId: issue.issueId,
                    attachmentUrl: attachmentUrl,
                    attachmentType: file.mimetype,
                    fileName: file.originalname,
                    uploadedBy: req.body.reporterUserId
                });
            }
        }

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

// get Issue data
const getIssue = async( req, res ) => {
    try{
        const issues = await Issue.findAll();
        if(!issues) {
            return res.status(404).json({ message: 'Issue data not found.' });
        }
        return res.status(200).json({
            issueData: issues,
            message: 'Issue data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching Issues."
        })
    }
};

// get Issue data by Id
const getIssueById = async( req, res ) => {
    try{
        const { issueId } = req.params;
        const issues = await Issue.findOne({ where: {issueId} });
        if(!issues) {
            return res.status(404).json({ message: 'Issue data not found.' });
        }
        return res.status(200).json({
            issueData: issues,
            message: 'Issue data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching Issues."
        })
    }
}

// get issue data for corresponding parent issue id
const getIssueByParentId = async (req, res) => {
    try {
      const { parentIssueId } = req.params;
  
      // Fetch parent issue
      const parentIssue = await Issue.findOne({
        where: { issueId: parentIssueId }
      });
  
      // Fetch child issues
      const childIssues = await Issue.findAll({
        where: { parentIssueId: parentIssueId }
      });
  
      // Check if parent issue exists
      if (!parentIssue) {
        return res.status(404).json({ message: 'Parent Issue Data is missing' });
      }
  
      // Check if there are child issues
      if (childIssues.length === 0) {
        return res.status(404).json({ message: 'Child Issue Data is missing' });
      }
  
      // Return the parent and child issues
      const IssueData = {
        parentIssue,
        childIssues
      };
  
      return res.status(200).json({
        issueData: IssueData,
        message: 'Issues data fetched successfully'
        });
  
    } catch (err) {
      return res.status(500).json({
        message: err.message || "Some error occurred while fetching the issues."
      });
    }
};


//////////////////// Working ////////////////////
// get overall issue details
const getIssueDetails = async (req, res) => {
    try {
        const { issueId, assigneeUserId } = req.params;

        // Fetch issue details
        const issuedetails = await Issue.findOne({
            where: { issueId },
            attributes: ['issueId', 'priority', 'issueType', 'title', 'status', 'projectId', 'assigneeUserId']
        });

        if (!issuedetails) {
            return res.status(404).json({ message: 'Data not found' });
        }

        const projectId = issuedetails.projectId;

        // Fetch project details
        const projectdetails = await Project.findOne({
            where: { projectId },
            attributes: ['projectName']
        });

        // Fetch project members excluding the assignee user and only those related to the particular project
        const projectmembers = await ProjectMember.findAll({
            where: {
                projectId: projectId,
                userId: { [Op.ne]: assigneeUserId }
            },
            include: {
                model: User,
                attributes: ['firstName', 'lastName']
            }
        });

        // Combine first and last names into key-value pairs
        const memberNames = [...new Set(projectmembers.map(pm => `${pm.User.firstName} ${pm.User.lastName}`))];

        // Fetch Attachments related to the Issue Id
        const attachments = await Attachment.findAll({
            where: { issueId: issueId },
            attributes: ['fileName', 'attachmentUrl']
        });

        // // Fetch Issue History related to the Issue Id
        // const issueHistory = await IssueHistory.findAll({
        //     where: { issueId: issueId },
        //     attributes: ['issueHistory', 'issueHistoryDate', 'userId'],
        //         include: {
        //             model: User,
        //             attributes: ['firstName', 'lastName']
        //             }
        // });                                    

        return res.status(200).json({
            issuedetails,
            attachments,
            projectdetails,
            memberNames,
            message: 'Issue details fetched successfully'
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Some error occurred while fetching" });
    }
};

  


module.exports = { createIssue, getIssue, getIssueById, getIssueByParentId, getIssueDetails };