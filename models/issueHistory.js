module.exports = ( sequelize, Sequelize ) => {
    const IssueHistory = sequelize.define('IssueHistory', {
        historyId: { type: Sequelize.STRING, primaryKey: true },
        issueId: { type: Sequelize.STRING, allowNull: false, references: { model: 'Issue', key: 'issueId' } },
        userId: { type: Sequelize.STRING, allowNull: false, references: { model: 'User', key: 'userId' } },
        changeType: { type: Sequelize.STRING, allowNull: false },
        oldValue: { type: Sequelize.STRING, allowNull: false },
        newValue: { type: Sequelize.STRING, allowNull: false }
    });

    return IssueHistory;
};