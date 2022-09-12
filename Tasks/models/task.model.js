const { db, DataTypes } = require('../utils/database.util');

const Task = db.define('task', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	limitDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	startDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	finishDate: {
		type: DataTypes.DATE,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Task };