module.exports = ( sequelize, Sequelize ) => {
    const WorkFlow = sequelize.define('WorkFlow', {
        workflowId: { type: Sequelize.STRING, primaryKey: true },
        issueId: { type: Sequelize.STRING, allowNull: false, references: { model: 'Issue', key: 'issueId' } },
        status: { type: Sequelize.STRING, allowNull: false },
        updatedBy: { type: Sequelize.STRING, references: { model: 'User', key: 'userName' } }
    });

    return WorkFlow;
};