module.exports = function(sequelize, DataTypes) {
    var Split = sequelize.define("Split", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    });

    Split.associate = function(models) {
        Split.belongsTo(models.Transaction, {
            foreignKey: 'transaction_id',
            targetKey: 'id'
        });
    };
    
    Split.getSplits = function(id, models) {
        console.log(" --- In splits.js (of models) - getSplits --- ");
        return this.findAll({
            where: {
                transaction_id: id
            }
        });
    };

    return Split;
};