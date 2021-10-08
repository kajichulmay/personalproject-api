module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        uunique: true,
      },
    },
    {
      underscored: true,
    }
  );
  Category.associate = models => {
    Category.hasMany(models.Book, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Category;
};
