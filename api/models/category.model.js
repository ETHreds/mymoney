import { DataTypes } from 'sequelize';
import dbClient from '../configs/db.js';
import User from './user.model.js';

const Category = dbClient.sequelize.define('category', {
    categoryId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['income', 'expense']],
                msg: 'Type must be either income or expense',
            },
        },
    },
    parentCategoryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'categoryId',
        },
        onDelete: 'CASCADE',
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
});

User.hasMany(Category, { foreignKey: 'userId', as: 'categories' });
Category.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Category, { foreignKey: 'parentCategoryId', as: 'subcategories' });
Category.belongsTo(Category, { foreignKey: 'parentCategoryId', as: 'parentCategory' });

export default Category;
