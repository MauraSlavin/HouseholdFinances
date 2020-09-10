module.exports = function(sequelize, DataTypes) {
    var Split = sequelize.define("Split", {
        amount: DataTypes.DECIMAL(8,2),
        category: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return Split;
};