const { v4: uuidv4 } = require('uuid');

function formatDate(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear()).substr(-2);  
    return `${mm}${dd}${yy}`;
}

// Mapping roles to custom prefixes
const rolePrefixes = {
    Admin: 'AD',
    'Project Manager': 'PM',
    User: 'USR'
};

// Simulating a database or storage for user counters by role
let userCounters = {
    Admin: 0,
    ProjectManager: 0,
    User: 0
};

function generateUserId(role) {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    userCounters[role]++;

    // Generate a custom user ID using prefix, formattedDate, and counter for the role
    const userId = `${rolePrefixes[role]}-${formattedDate}-${userCounters[role]}`;

    return userId;
}

// Simulating a database or storage for projectCounter
let projectCounter = 0;

function generateProjectId() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    projectCounter++; 

    // Generate a custom ID using formattedDate and counter
    const projectId = `P-${formattedDate}-${projectCounter}`;

    return projectId;
}

// Simulating a database or storage for issue counter
let issueCounter = 0;

function generateIssueId() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    issueCounter++; 

    // Generate a custom ID using formattedDate and counter
    const issueId = `I-${formattedDate}-${issueCounter}`;

    return issueId;
}

// Simulating a database or storage for labelCounter
let labelCounter = 0;

function generateLabelId() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    labelCounter++; 

    // Generate a custom ID using formattedDate and counter
    const labelId = `L-${formattedDate}-${labelCounter}`;

    return labelId;
}

// Simulating a database or storage for historyCounter
let historyCounter = 0;

function generateHistoryId() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    historyCounter++; 

    // Generate a custom ID using formattedDate and counter
    const historyId = `H-${formattedDate}-${historyCounter}`;

    return historyId;
}

// Simulating a database or storage for attachmentCounter
let attachmentCounter = 0;

function generateAttachmentId() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    attachmentCounter++; 

    // Generate a custom ID using formattedDate and counter
    const attachmentId = `A-${formattedDate}-${attachmentCounter}`;

    return attachmentId;
}

// Simulating a database or storage for workflowCounter
let workflowCounter = 0;

function generateWorkflowId() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    workflowCounter++; 

    // Generate a custom ID using formattedDate and counter
    const workflowId = `W-${formattedDate}-${workflowCounter}`;

    return workflowId;
}


module.exports = { generateUserId, generateProjectId, generateIssueId, generateLabelId, generateHistoryId, generateAttachmentId, generateWorkflowId };
