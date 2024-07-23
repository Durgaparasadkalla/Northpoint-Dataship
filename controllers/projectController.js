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

async function uploadImageToS3(file) {
    return new Promise(async (resolve, reject) => {
        const fileContent = fs.readFileSync(file.path);
        const imageName = `${uuidv4()}-${file.originalname}`;

        const uploadParams = {
            Bucket: process.env.Bucket_Name,
            Key: imageName,
            Body: fileContent,
            ACL: 'public-read',
            ContentType: file.mimetype
        };

        try {
            // Upload the file to S3
            await s3.send(new PutObjectCommand(uploadParams));

            // Construct the presigned URL for the uploaded image
            const presignedUrl = `https://${process.env.Bucket_Name}.s3.${process.env.Bucket_Region}.amazonaws.com/${imageName}`;

            resolve(presignedUrl);
        } catch (error) {
            reject(error);
        }
    });
}

// Create and Save a new Project
const createProject = async (req, res) => {
  try {
      const { projectName, summary, description, leadUserId } = req.body;

      const file = req.file;
      if (file) {
        image = await uploadImageToS3(file)
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

// get Recent Projects
const getLatestProjects = async(req, res) => {
    try{
        const projectData = await Project.findAll({ limit: 3, order:[['createdAt', 'DESC']] });
        if (!projectData) {
            return res.status(400).json({ message: "Data not found" });
            }
        return res.status(200).json(projectData);
    }catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching the Project details."   
        });
    }
};



module.exports = { createProject, getProject, getProjectById, getLatestProjects };