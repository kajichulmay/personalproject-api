module.exports = (sequelize, DataTypes) => {
  const NoticePayment = sequelize.define(
    'NoticePayment',
    {
      paidTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      imageUrl: DataTypes.STRING,
    },

    {
      underscored: true,
    }
  );
  NoticePayment.associate = models => {
    NoticePayment.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    NoticePayment.belongsTo(models.Bank, {
      foreignKey: {
        name: 'bankId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return NoticePayment;
};
