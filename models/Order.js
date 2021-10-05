module.exports = (sequelize, Datatypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
      },
      sumPrice: {
        type: Datatypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      date: {
        type: Datatypes.DATE,
      },
    },
    {
      underscored: true,
    }
  );
  Order.associate = models => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId', // // ต้องเขียน id ของฝั่ง one
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    }),
      Order.hasMany(models.OrderItem, {
        foreignKey: {
          name: 'orderId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      });
    Order.hasOne(models.NoticePayment, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Order;
};
