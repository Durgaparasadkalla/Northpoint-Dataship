const { createUser, getUser, getUserById, getUserByRole, login } = require("./controllers/userController.js");
const { createProject, getProject, getProjectById } = require("./controllers/projectController.js");
const { createProjectMember, getProjectMember, getMembersByProjectId, getMembersByUserId, getMembersByUserRole } = require("./controllers/projectMemberController.js");
const { createIssue, getIssue, getIssueById, getIssueByParentId } = require("./controllers/issueController.js");
const { createLabel, getLabel, getLabelByLabelName } = require("./controllers/labelController.js");
const { createIssueLabel, getIssueLabel, getIssueLabelByIssueId } = require("./controllers/issueLabelController.js");
const { createIssueHistory, getIssueHistory, getIssueHistoryByIssueId } = require("./controllers/issueHistoryController.js");
const { getAttachment, getAttachmentByIssueId } = require("./controllers/attachmentController.js");
const { createWorkflow, getWorkflow, getWorkflowByIssueId, getWorkflowByStatus } = require("./controllers/workflowController.js");
const router = require("express").Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

// User Controller
router.post("/user", createUser);
router.get("/getuser", getUser);
router.get("/getuserbyid/:userId", getUserById);
router.get("/getuserbyrole/:role", getUserByRole);
router.post("/login", login);

// Project Controller
router.post("/project", upload.single('image'), createProject);
router.post("/project", createProject);
router.get("/getproject", getProject);
router.get("/getprojectbyid/:projectId", getProjectById);

// ProjectMember Controller
router.post("/projectmember", createProjectMember);
router.get("/getprojectmember", getProjectMember);
router.get("/getprojectmemberbyprojectid/:projectId", getMembersByProjectId);
router.get("/getprojectmemberbyuserid", getMembersByUserId);
router.get("/getprojectmemberbyuserrole", getMembersByUserRole);

// Issue Controller
router.post("/issue", upload.array('files', 10), createIssue);
router.get("/getissue", getIssue );
router.get("/getissuebyid/:issueId", getIssueById);
router.get("/getissuebyparentid/:parentIssueId", getIssueByParentId);

// Label Controller
router.post("/label", createLabel);
router.get("/getlabel", getLabel );
router.get("/getlabelbylabelname/:labelName", getLabelByLabelName);

// IssueLabel Controller
router.post("/issuelabel", createIssueLabel);
router.get("/getissuelabel", getIssueLabel );
router.get("/getissuelabelbyissueid/:issueId", getIssueLabelByIssueId);

// IssueHistory Controller
router.post("/issuehistory", createIssueHistory);
router.get("/getissuehistory", getIssueHistory);
router.get("/getissuehistorybyissueid/:issueId", getIssueHistoryByIssueId);

// Attachment Controller
router.get("/getattachment", getAttachment);
router.get("/getattachmentbyissueid/:issueId", getAttachmentByIssueId);

// Workflow Controller
router.post("/workflow", createWorkflow);
router.get("/getworkflow", getWorkflow);
router.get("/getworkflowbyissueid/:issueId", getWorkflowByIssueId);
router.get("/getworkflowbystatus/:status", getWorkflowByStatus);



module.exports = router;
