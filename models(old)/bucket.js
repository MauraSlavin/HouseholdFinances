module.exports = function(sequelize, DataTypes) {
    var Bucket = sequelize.define("Bucket", {
        amount: DataTypes.DECIMAL(10,2),
        bucket: DataTypes.STRING
    });

    return Bucket;
};