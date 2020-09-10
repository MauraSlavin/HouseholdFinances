module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
        trans_date: DataTypes.DATEONLY,
        post_date: DataTypes.DATEONLY,
        amount: DataTypes.DECIMAL(8,2),
        to_from: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        stmt_date: DataTypes.DATEONLY
    });

    Transaction.associate = function(models) {
        Transaction.hasMany(models.Split, {
            onDelete: "cascade"
        });

        Transaction.hasMany(models.Bucket, {
            onDelete: "cascade"
        });
    };

    return Transaction;
};