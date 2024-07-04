module.exports = ( sequelize, Sequelize ) => {
    const Comment = sequelize.define('Comment', {
        commentId: { type: Sequelize.STRING, primaryKey: true },
        issueId: { type: Sequelize.STRING, allowNull: false, references: { model: 'Issue', key: 'issueId' } },
        userId: { type: Sequelize.STRING, allowNull: false, references: { model: 'User', key: 'userId' } },
        commentText: { type: Sequelize.STRING },
    });

    return Comment;
};