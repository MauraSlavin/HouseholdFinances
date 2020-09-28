module.exports = function(sequelize, DataTypes) {
    const Op = DataTypes.Op;
    var Transaction = sequelize.define("Transaction", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trans_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        post_date: {
            type: DataTypes.DATEONLY
        },
        verified: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        amount: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        },
        to_from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stmt_date: {
            type: DataTypes.DATEONLY
        }
    });
    
    Transaction.associate = function(models) {
        Transaction.belongsTo(models.Account, {
            foreignKey: 'account_id',
            targetKey: 'id'
        });
        
        Transaction.hasMany(models.Split, {
            foreignKey: 'transaction_id',
            sourceKey: 'id',
            onDelete: "cascade"
        });
        
        Transaction.hasMany(models.Bucket, {
            foreignKey: 'transaction_id',
            sourceKey: 'id',
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