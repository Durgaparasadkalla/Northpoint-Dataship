module.exports = ( sequelize, Sequelize) => {
    const Issue = sequelize.define('Issue', {
        issueId: { type: Sequelize.STRING, primaryKey: true },
        projectId: { type: Sequelize.STRING, references: { model: 'Project', key: 'projectId' } },
        reporterUserId: { type: Sequelize.STRING, references: { model: 'User', key: 'userId' } },
        assigneeUserId: { type: Sequelize.STRING, references: { model: 'User', key: 'userId' } },
        title: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING, allowNull: false },
        priority: { type: Sequelize.STRING, allowNull: false },
        issueType: { type: Sequelize.STRING, allowNull: false },
    });

    return Issue;
};

// ParentIssue
// Attachment
// linkedissuedtype
// linkedissue