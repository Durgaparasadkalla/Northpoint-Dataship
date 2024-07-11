module.exports = (sequelize, Sequelize) => {
    const Attachment = sequelize.define('Attachment', {
        attachmentId: { type: Sequelize.STRING, primaryKey: true },
        issueId: { type: Sequelize.STRING, references: { model: 'Issue', key: 'issueId' }, onDelete: 'CASCADE' },
        attachmentUrl: { type: Sequelize.STRING, allowNull: false },
        attachmentType: { type: Sequelize.STRING, allowNull: false },
        fileName: { type: Sequelize.STRING, allowNull: false },
        uploadedBy: { type: Sequelize.STRING, allowNull: false, references: { model: 'User', key: 'userId' } },
    });

    return Attachment;
};
