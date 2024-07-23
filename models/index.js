const dbConfig = require("../config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    freezeTableName: true, // Prevent Sequelize from modifying table names
  },
  // logging: false, // Disable logging (can enable it for debugging)
  // logging: console.log,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user.js')(sequelize, Sequelize);
db.Project = require('./project.js')(sequelize, Sequelize);
db.Issue = require('./issue.js')(sequelize, Sequelize);
db.IssueHistory = require('./issueHistory.js')(sequelize, Sequelize);
db.Attachment = require('./attachment.js')(sequelize, Sequelize);
db.Workflow = require('./workflow.js')(sequelize, Sequelize);
db.Label = require('./label.js')(sequelize, Sequelize);
db.IssueLabel = require('./issueLabel.js')(sequelize, Sequelize);
db.ProjectMember = require('./projectMember.js')(sequelize, Sequelize);

// User to Project associations
db.User.hasMany(db.Project, { foreignKey: 'leadUserId' });  // One user can lead multiple projects
db.Project.belongsTo(db.User, { foreignKey: 'leadUserId' });  // Each project is led by one user

// User to ProjectMember associations
db.User.belongsToMany(db.Project, { through: db.ProjectMember, foreignKey: 'userId' });
db.Project.belongsToMany(db.User, { through: db.ProjectMember, foreignKey: 'projectId' });

// User to Issue associations
db.User.hasMany(db.Issue, { as: 'reportedIssues', foreignKey: 'reporterUserId' });
db.User.hasMany(db.Issue, { as: 'assignedIssues', foreignKey: 'assigneeUserId' });
db.Issue.belongsTo(db.User, { as: 'reporter', foreignKey: 'reporterUserId' });
db.Issue.belongsTo(db.User, { as: 'assignee', foreignKey: 'assigneeUserId' });

// Project to Issue associations
db.Project.hasMany(db.Issue, { foreignKey: 'projectId' });  // One project can have multiple issues
db.Issue.belongsTo(db.Project, { foreignKey: 'projectId' });  // Each issue belongs to one project

// Issue to IssueHistory associations
db.Issue.hasMany(db.IssueHistory, { foreignKey: 'issueId' });  // One issue can have multiple history records
db.IssueHistory.belongsTo(db.Issue, { foreignKey: 'issueId' });  // Each history record belongs to one issue

// Issue to Attachment associations
db.Issue.hasMany(db.Attachment, { foreignKey: 'issueId' });  // One issue can have multiple attachments
db.Attachment.belongsTo(db.Issue, { foreignKey: 'issueId' });  // Each attachment belongs to one issue

// Issue to Workflow associations
db.Issue.hasMany(db.Workflow, { foreignKey: 'issueId' });  // One issue can have multiple workflow statuses
db.Workflow.belongsTo(db.Issue, { foreignKey: 'issueId' });  // Each workflow status belongs to one issue

// Issue to Label associations
db.Issue.belongsToMany(db.Label, { through: db.IssueLabel, foreignKey: 'issueId' });
db.Label.belongsToMany(db.Issue, { through: db.IssueLabel, foreignKey: 'labelId' });

// User to IssueHistory associations
db.User.hasMany(db.IssueHistory, { foreignKey: 'userId' });  // One user can make multiple changes (history records)
db.IssueHistory.belongsTo(db.User, { foreignKey: 'userId' });  // Each history record is changed by one user

// User to Attachment associations
db.User.hasMany(db.Attachment, { foreignKey: 'uploadedBy' });  // One user can upload multiple attachments
db.Attachment.belongsTo(db.User, { foreignKey: 'uploadedBy' });  // Each attachment is uploaded by one user

db.ProjectMember.belongsTo(db.User, { foreignKey: 'userId' });
db.ProjectMember.belongsTo(db.Project, { foreignKey: 'projectId' });

// User to Workflow associations
db.User.hasMany(db.Workflow, { foreignKey: 'changedBy' });  // One user can change multiple workflow statuses
db.Workflow.belongsTo(db.User, { foreignKey: 'changedBy' });  // Each workflow status is changed by one user


module.exports = db;



// ************ Explanation ************
//hasOne
// One-to-one relationship.
// A user has one profile.

// hasMany
// A hasMany association indicates a one-to-many relationship.
// used when you have a parent-child relationship where the parent can have multiple children.

// belongsTo
// A belongsTo association indicates a many-to-one relationship.
// used when a child belongs to a single parent.

// belongsToMany
// A belongsToMany association indicates a many-to-many relationship.
// Used when instances of both models can have multiple associations with each other.


// db.Sequelize = Sequelize:
// This line assigns the Sequelize library itself to the db object. It allows you to access Sequelize's static properties and methods from the db object. This can be useful if you need to reference Sequelize's built-in data types, validation functions, or other static properties in different parts of your application.

// db.sequelize = sequelize:
// This line assigns an instance of Sequelize (i.e., a database connection) to the db object. This instance is configured with the database connection parameters and is used to interact with the database. It allows you to call instance methods for querying the database, defining models, and managing transactions.