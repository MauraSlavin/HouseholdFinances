module.exports = function(sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        begin_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        january: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        february: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        march: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        april: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        may: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        june: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        july: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        august: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        september: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        october: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        november: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        },
        december: {
            type: DataTypes.DECIMAL(8,2),
            defaultValue: 0
        }
    });

    return Bucket;
};
