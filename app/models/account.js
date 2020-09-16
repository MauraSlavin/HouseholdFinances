module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("account", {
        nick_name: DataTypes.STRING,
        image: DataTypes.STRING
    });

    Account.associate = function(models) {
        Account.hasMany(models.Transaction, {
            onDelete: "cascade"
        });
    };

    return Account;
};