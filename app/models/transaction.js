// const { values } = require("sequelize/types/lib/operators");

module.exports = function(sequelize, DataTypes) {
    const Op = DataTypes.Op;
    var Transaction = sequelize.define("Transaction", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        account_id: DataTypes.INTEGER,
        trans_date: DataTypes.DATEONLY,
        post_date: DataTypes.DATEONLY,
        verified: DataTypes.BOOLEAN,
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

    Transaction.getClearedBalances = function(models) {
        // const { values } = require("sequelize");
        return this.findAll({
            attributes:  [ 'account_id', [sequelize.fn('sum', sequelize.col('amount')), 'balance']],
            group: ['account_id'],
            where: {
                post_date: {
                  [Op.ne]: null
                }
              },
            raw: true  
        });    
    };

    Transaction.getAccountTransactions = function(id, models) {
        console.log("In transaction.js (of models) - getAccountTransactions");
        return this.findAll({
            where: {
                account_id: id
            }
        });
    };

    return Transaction;
};