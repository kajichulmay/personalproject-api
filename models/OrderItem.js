module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      underscored: true,
    }
  );
  OrderItem.associate = models => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    }),
      OrderItem.belongsTo(models.Book, {
        foreignKey: {
          name: 'bookId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      });
  };
  return OrderItem;
};
