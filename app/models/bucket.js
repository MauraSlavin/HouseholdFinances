module.exports = function(sequelize, DataTypes) {
    var Bucket = sequelize.define("Bucket", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        bucket: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Bucket;
};