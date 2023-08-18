module.exports = (sequelize, DataTypes) => {

    const Properties = sequelize.define('Properties', {
        propertyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING
        },
        area: {
            type: DataTypes.STRING
        },
        propertyType: {
            type: DataTypes.STRING
        }
    }, {
        // Other model options go here
        tableName: 'properties'
    });

    return Properties;
}