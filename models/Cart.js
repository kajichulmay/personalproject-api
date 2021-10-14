module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      sumAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sumPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      isConfirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  Cart.associate = models => {
    Cart.belongsTo(models.Book, {
      foreignKey: {
        name: 'bookId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Cart;
};
