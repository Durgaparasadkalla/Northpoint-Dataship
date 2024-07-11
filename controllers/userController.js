const { generateUserId } = require("../idGenerator");
const db = require("../models");
const User = db.User;

// Create and Save a new User
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, mobileNumber, organization, email, role, userName, password } = req.body;
        // Create a Project object
        const user = {
            userId: generateUserId(role), 
            firstName, 
            lastName, 
            mobileNumber,
            organization,
            email, 
            role: role || "User", 
            userName, 
            password
        };

        // Save User in the database
        const data = await User.create(user);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the User."
        });
    }
};


// get Users data
const getUser = async ( req, res ) => {
    try{
        const userData = await User.findAll();
        if (!userData) {
            return res.status(400).json({ message: "Data not found." });
        }
        return res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching the User."
        });
    }
};


// get User by id
const getUserById = async( req, res ) => {
    try{
        const { userId } = req.params;
        const userData = await User.findOne({ where: { userId } });
        if(!userData) {
            return res.status(400).json({ message: "Data not found." });
        }
        return res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching the User."
        });
    }
};

// get User data by Role
const getUserByRole = async( req, res ) => {
    try{
        const { role } = req.params;
        const userData = await User.findOne({ where: { role } });
        if(!userData) {
            return res.status(404).json({ message: 'User Data data not found.' });
        }
        return res.status(200).json({
            UserData: userData,
            message: 'User data fetched successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching User."
        })
    }
};

// login
const login = async( req, res ) => {
    try{
        const { userName, password } = req.body;
        const login = await User.findOne({ where: { userName, password }});
        if (!login) {
            return res.status(404).json({ message: 'UserName/Password incorrect'})
        };
        return res.status(200).json({
            loginDetails: login,
            message: 'Login Successfull'
        })
    } catch(err) {
        return res.status(500).json({
            message: err.message || "Some error occurred while fetching the User."
        })
    }
};


module.exports = { createUser, getUser, getUserById, getUserByRole, login };