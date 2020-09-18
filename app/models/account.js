module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("account", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nick_name: DataTypes.STRING,
        purpose: DataTypes.STRING,
        image: DataTypes.STRING
    });

    Account.associate = function(models) {
        Account.hasMany(models.Transaction, {
            foreignKey: 'account_id',
            sourceKey: 'id',
            onDelete: "cascade"
        });
    };

    return Account;
};