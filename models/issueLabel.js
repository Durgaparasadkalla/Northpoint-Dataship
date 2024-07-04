module.exports = ( sequelize, Sequelize ) => {
    const IssueLabel = sequelize.define('IssueLabel', {
        issueId: { type: Sequelize.STRING, primaryKey: true, references: { model: 'Issue', key: 'issueId' } },
        labelId: { type: Sequelize.STRING, primaryKey: true, references: { model: 'Label', key: 'labelId' } }
    });

    return IssueLabel;
};