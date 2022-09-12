const { User } = require('./user.model');
const { Task } = require('./task.model');

const initModels = () => {
  //* 1 User <----> M Task
  User.hasMany(Task, { foreignKey: 'userId' });
  //* 1 task <-----> 1 User
  Task.belongsTo(User);
};

module.exports = { initModels };
