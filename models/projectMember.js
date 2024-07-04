module.exports = ( sequelize, Sequelize) => {
    const ProjectMember = sequelize.define('ProjectMember', {
        projectId: { type: Sequelize.STRING, primaryKey: true, references: { model: 'Project', key: 'projectId' } },
        userId: { type: Sequelize.STRING, primaryKey: true, references: { model: 'User', key: 'userId' } },
        role: { type: Sequelize.STRING, allowNull: false }
    });

    return ProjectMember;
};