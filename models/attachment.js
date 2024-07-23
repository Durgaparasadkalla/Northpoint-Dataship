module.exports = (sequelize, Sequelize) => {
    const Attachment = sequelize.define('Attachment', {
        attachmentId: { type: Sequelize.STRING, primaryKey: true },
        issueId: { type: Sequelize.STRING, references: { model: 'Issue', key: 'issueId' }, onDelete: 'CASCADE' },
        attachmentUrl: { type: Sequelize.STRING },
        attachmentType: { type: Sequelize.STRING },
        fileName: { type: Sequelize.STRING },
        uploadedBy: { type: Sequelize.STRING, references: { model: 'User', key: 'userId' }, unique: false },
    });

    return Attachment;
};
