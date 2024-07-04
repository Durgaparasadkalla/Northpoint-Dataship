module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define('Project', {
    projectId: { type: Sequelize.STRING, primaryKey: true },
    projectName: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING },
    leadUserId: { type: Sequelize.STRING, references: { model: 'User', key: 'userId' } }
  });

  return Project;
};
