module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define(
    'Bank',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Bank.asscoiate = models => [
    Bank.hasOne(models.NoticePayment, {
      foreignKey: {
        name: 'bankId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    }),
  ];
  return Bank;
};
