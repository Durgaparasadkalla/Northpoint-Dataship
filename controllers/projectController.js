const db = require("../models");
const Project = db.Project;const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const { generateProjectId } = require("../idGenerator");

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

// Create and Save a new Project
const createProject = async (req, res) => {
  try {
      const { projectName, summary, description, leadUserId } = req.body;

      const image = req.file;
      if (image) {
        image = await uploadFileToS3(image)
      }

      // Create a Project object
      const project = {
        projectId: generateProjectId(), 
        projectName, 
        image,
        summary,
        description, 
        leadUserId
      };

      // Save Project in the database
      const data = await Project.create(project);
      res.json(data);
  } catch (err) {
      res.status(500).json({
          message: err.message || "Some error occurred while creating the Project."
      });
  }
};


// get Project details
const getProject = async (req, res) => {
    try {
        const projectData = await Project.findAll();
        if (!projectData) {
            return res.status(400).json({ message: "Data not found" });
        };
        return res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching the Project details."
        });
    }
};


// get Project details by id
const getProjectById = async( req, res ) => {
    try{
        const { projectId } = req.params;
        const projectData = await Project.findOne({ where: { projectId } });
        if (!projectData) {
            return res.status(400).json({ message: "Data not found" });
        }
        return res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching the Project details."
        });
    }
};



module.exports = { createProject, getProject, getProjectById };