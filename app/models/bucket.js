module.exports = function(sequelize, DataTypes) {
    var Bucket = sequelize.define("Bucket", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        amount: DataTypes.DECIMAL(10,2),
        bucket: DataTypes.STRING
    });

    return Bucket;
};