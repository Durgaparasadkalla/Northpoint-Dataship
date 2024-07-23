const db = require('../models');
const User = db.User;
const ProjectMember = db.ProjectMember;
const { Op } = require('sequelize');

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

// get collaboraters by user credentials
const getCollaboraters = async( req, res ) => {
    try{
        const { userId } = req.params;
        const userProjects = await ProjectMember.findAll({ where: { userId }, attributes: ['projectId'] });

        const projectIds = userProjects.map(projectMember => projectMember.projectId);
        console.log('projectIds',projectIds);

        // Exclude the particular user and get collaboraters
        const projectmembers = await ProjectMember.findAll({
            where: {
                projectId: projectIds ,
                userId: { [Op.ne]: userId }  // In Sequelize, Op is short for Operators. ne - not equal
            },
            include: {
                model: User,
                attributes: ['firstName', 'lastName']    
            }
        });
        console.log('projectmembers',projectmembers);

        // Combine first and last names
        const memberNames = [...new Set( projectmembers.map(pm => `${pm.User.firstName} ${pm.User.lastName}`) )];

        return res.status(200).json({
            projectMembersData: memberNames,
            message: 'Project Members data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching Project Members."
            })
        };
};



module.exports = { createProjectMember, getProjectMember, getMembersByProjectId, getMembersByUserId, getMembersByUserRole, getCollaboraters };

