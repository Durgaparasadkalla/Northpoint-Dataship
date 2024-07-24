const { v4: uuidv4 } = require('uuid');

function formatDate(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear()).substr(-2);  
    return `${mm}${dd}${yy}`;
}

// // Mapping roles to custom prefixes
// const rolePrefixes = {
//     Admin: 'AD',
//     'Project Manager': 'PM',
//     'Project Lead': 'PL',
//     User: 'USR'
// };

// Mapping roles to custom prefixes
const rolePrefixes = {
    'role1': 'R1',
    'role2': 'R2',
    'role3': 'R3'
};

// Initialize a global counter
let userCounter = 0;

function generateUserId(role) {
    userCounter++;

    // Generate a custom user ID using prefix and global counter
    const userId = `${rolePrefixes[role]}-${userCounter}`;

    return userId;
}

// Simulating a database or storage for projectCounter
let projectCounter = 0;

function generateProjectId() {
    projectCounter++; 

    // Generate a custom ID using formattedDate and counter
    const projectId = `PROJECT-${projectCounter}`;

    return projectId;
}

// Simulating a database or storage for issue counter
let issueCounter = 0;

function generateIssueId() {
    issueCounter++; 

    // Generate a custom ID using formattedDate and counter
    const issueId = `ISSUE-${issueCounter}`;

    return issueId;
}

// Simulating a database or storage for labelCounter
let labelCounter = 0;

function generateLabelId() {
    labelCounter++; 

    // Generate a custom ID using formattedDate and counter
    const labelId = `LABEL-${labelCounter}`;

    return labelId;
}

// Simulating a database or storage for historyCounter
let historyCounter = 0;

function generateHistoryId() {
    historyCounter++; 

    // Generate a custom ID using formattedDate and counter
    const historyId = `HISTORY-${historyCounter}`;

    return historyId;
}

// Simulating a database or storage for attachmentCounter
let attachmentCounter = 0;

function generateAttachmentId() {
    attachmentCounter++; 

    // Generate a custom ID using formattedDate and counter
    const attachmentId = `ATTACHMENT-${attachmentCounter}`;

    return attachmentId;
}

// Simulating a database or storage for workflowCounter
let workflowCounter = 0;

function generateWorkflowId() {
    workflowCounter++; 

    // Generate a custom ID using formattedDate and counter
    const workflowId = `WORKFLOW-${workflowCounter}`;

    return workflowId;
}


module.exports = { generateUserId, generateProjectId, generateIssueId, generateLabelId, generateHistoryId, generateAttachmentId, generateWorkflowId };
