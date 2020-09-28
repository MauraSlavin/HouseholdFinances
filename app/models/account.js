module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("account", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nick_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purpose: DataTypes.STRING,
        image: {
            type: DataTypes.STRING,
            defaultValue: 'DefaultAcctImage.png'
        }
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