const { createUser, getUser, getUserById, login } = require("./controllers/userController.js");
const { createProject, getProject, getProjectById } = require("./controllers/projectController.js");
const { createProjectMember } = require("./controllers/projectMemberController.js");
const { createIssue } = require("./controllers/issueController.js");
const { createLabel } = require("./controllers/labelController.js");
const { createIssueLabel } = require("./controllers/issueLabelController.js");
const { createIssueHistory } = require("./controllers/issueHistoryController.js");
const { createComment } = require("./controllers/commentController.js");
const { createAttachment, getAttachment } = require("./controllers/attachmentController.js");
const { createWorkflow } = require("./controllers/workflowController.js");
const router = require("express").Router();
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// User Controller
router.post("/user", createUser);
router.get("/getuser", getUser);
router.get("/getuserbyid/:userId", getUserById);
router.post("/login", login);

// Project Controller
router.post("/project", createProject);
router.get("/getproject", getProject);
router.get("/getprojectbyid/:projectId", getProjectById);

// ProjectMember Controller
router.post("/projectmember", createProjectMember);

// Issue Controller
router.post("/issue", createIssue);

// Label Controller
router.post("/label", createLabel);

// IssueLabel Controller
router.post("/issuelabel", createIssueLabel);

// IssueHistory Controller
router.post("/issuehistory", createIssueHistory);

// Comment Controller
router.post("/comment", createComment);

// Attachment Controller
router.post('/attachment', upload.single('files'), createAttachment);
router.get("/getattachment", getAttachment);

// Workflow Controller
router.post("/workflow", createWorkflow);


module.exports = router;
