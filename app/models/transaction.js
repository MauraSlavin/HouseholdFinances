// const { values } = require("sequelize/types/lib/operators");

module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        account_id: DataTypes.INTEGER,
        trans_date: DataTypes.DATEONLY,
        post_date: DataTypes.DATEONLY,
        amount: DataTypes.DECIMAL(8,2),
        to_from: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        stmt_date: DataTypes.DATEONLY
    });
    
    Transaction.associate = function(models) {
        Transaction.belongsTo(models.Account, {
            foreignKey: 'account_id',
            targetKey: 'id'
        });
        
        Transaction.hasMany(models.Split, {
            onDelete: "cascade"
        });
        
        Transaction.hasMany(models.Bucket, {
            onDelete: "cascade"
        });
    };
    
    Transaction.getRegisterBalances = function(models) {
        // const { values } = require("sequelize");
        return this.findAll({
            attributes:  [ 'account_id', [sequelize.fn('sum', sequelize.col('amount')), 'balance']],
            raw: true,
            group: ['account_id']
        });    
    };

    // Transaction.getClearedBalances = function(models) {
    //     // const { values } = require("sequelize");
    //     return this.findAll({
    //         attributes:  [ 'account_id', [sequelize.fn('sum', sequelize.col('amount')), 'balance']],
    //         group: ['account_id'],
    //         raw: true  
    //     });    
    // };

    return Transaction;
};