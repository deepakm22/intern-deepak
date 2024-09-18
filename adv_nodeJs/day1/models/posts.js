const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./User');

const Posts = sequelize.define('Posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
}, {
    tableName: 'Posts',
    timestamps: false,
});


const PostLikesComments = sequelize.define('PostLikesComments', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Posts,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    like: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'PostLikesComments',
    timestamps: false,
});


Users.hasMany(Posts, { foreignKey: 'userId' });
Posts.belongsTo(Users, { foreignKey: 'userId' });

Posts.hasMany(PostLikesComments, { foreignKey: 'postId' });
PostLikesComments.belongsTo(Posts, { foreignKey: 'postId' });

Users.hasMany(PostLikesComments, { foreignKey: 'userId' });
PostLikesComments.belongsTo(Users, { foreignKey: 'userId' });

module.exports = { Posts, PostLikesComments };
