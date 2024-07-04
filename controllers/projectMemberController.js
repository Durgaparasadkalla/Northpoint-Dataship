const db = require('../models');
const ProjectMember = db.ProjectMember;

// create and save Project Mombers
const createProjectMember = async( req, res ) => {
    try{
        const { projectId, userId, role } = req.body;
        const projectMember = {
            projectId,
            userId,
            role
        };

        // Save Project Members
        const ProjectMembers = await ProjectMember.create(projectMember);
        return res.status(200).json({
            projectmembers: ProjectMembers,
            message: 'Project Members data stored successfully'
        });
    } catch (err){
        res.status(500).json({
            message: err.message || "Some error occurred while creating Project Members."
        });
    }
};


module.exports = { createProjectMember };

