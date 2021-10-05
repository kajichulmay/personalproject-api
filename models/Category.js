module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.ENUM('Manga', 'LightNovel'),
        allowNull: false,
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
