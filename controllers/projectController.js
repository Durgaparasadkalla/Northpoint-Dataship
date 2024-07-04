const db = require("../models");
const Project = db.Project;

// Create and Save a new Project
const createProject = async (req, res) => {
  try {
      const { projectId, projectName, description, leadUserId } = req.body;
      // Create a Project object
      const project = {
        projectId, 
        projectName, 
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