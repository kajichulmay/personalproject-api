const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { sequelize } = require('./models');
const authRoute = require('./route/authRoute');
const bookRoute = require('./route/bookRoute');
const categoryRoute = require('./route/categoryRoute');
const userRoute = require('./route/userRoute');
const orderItemRoute = require('./route/orderItemRoute');
const NoticePaymentRoute = require('./route/NoticPaymentRoute');
const BankRoute = require('./route/BankRoute');
const CartRoute = require('./route/CartRoute');
const OrderRoute = require('./route/OrderRoute');
const OrderItemRoute = require('./route/orderItemRoute');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// sequelize.sync();

app.use('/orderItem', OrderItemRoute);
app.use('/order', OrderRoute);
app.use('/addCart', CartRoute);
app.use('/bank', BankRoute);
app.use('/notice', NoticePaymentRoute);
app.use('/myaccount', userRoute);
app.use('/category', categoryRoute);
app.use('/', bookRoute);
app.use('/', orderItemRoute);
app.use('/', authRoute);

app.use((err, req, res, next) => {
  res.status(400).json({ message: err });
  console.log(err);
});

let port = process.env.PORT || 9999;
app.listen(port, () => console.log(`Server is Running on port ${port}`));
