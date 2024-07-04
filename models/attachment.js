module.exports = ( sequelize, Sequelize ) => {
    const Attachment = sequelize.define('Attachment', {
        attachmentId: { type: Sequelize.STRING, primaryKey: true },
        issueId: { type: Sequelize.STRING, references: { model: 'Issue', key: 'issueId' } },
        filePath: { type: Sequelize.STRING, allowNull: false },
        fileName: { type: Sequelize.STRING, allowNull: false },
        uploadedBy: { type: Sequelize.STRING, allowNull: false, references: { model: 'User', key: 'userName' } },
    });

    return Attachment;
};