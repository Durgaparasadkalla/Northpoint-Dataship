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

// get Project Member data
const getProjectMember = async( req, res ) => {
    try{
        const projectmember = await ProjectMember.findAll();
        if(!projectmember) {
            return res.status(404).json({ message: 'Project Members data not found.' });
        }
        return res.status(200).json({
            projectMemberData: projectmember,
            message: 'Project Members data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching Project Members."
        })
    }
};

// get Project Members data by Project Id
const getMembersByProjectId = async( req, res ) => {
    try{
        const { projectId } = req.params;
        const projectmember = await ProjectMember.findOne({ where: { projectId } });
        if(!projectmember) {
            return res.status(404).json({ message: 'Project Members data not found.' });
        }
        return res.status(200).json({
            projectMemberData: projectmember,
            message: 'Project Members data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching Project Members."
        })
    }
};

// get Project Members data by User Id
const getMembersByUserId = async( req, res ) => {
    try{
        const { projectId, userId } = req.body;
        const projectmember = await ProjectMember.findOne({ where: { projectId, userId } });
        if(!projectmember) {
            return res.status(404).json({ message: 'Project Members data not found.' });
        }
        return res.status(200).json({
            projectMemberData: projectmember,
            message: 'Project Members data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching Project Members."
        })
    }
};

// get Project Members data by User Role
const getMembersByUserRole = async( req, res ) => {
    try{
        const { projectId, role } = req.body;
        const projectmember = await ProjectMember.findOne({ where: { projectId, role } });
        if(!projectmember) {
            return res.status(404).json({ message: 'Project Members data not found.' });
        }
        return res.status(200).json({
            projectMemberData: projectmember,
            message: 'Project Members data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching Project Members."
        })
    }
};


module.exports = { createProjectMember, getProjectMember, getMembersByProjectId, getMembersByUserId, getMembersByUserRole };

