import { DataTypes } from 'sequelize';
import dbClient from '../configs/db.js';
import User from './user.model.js';

const SavingGoal = dbClient.sequelize.define('savingGoal', {
    goalId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    periodMonths: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    averageMonthlyContribution: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currentAmountSaved: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
});

User.hasMany(SavingGoal, { foreignKey: 'userId', as: 'savingGoals' });
SavingGoal.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default SavingGoal;
