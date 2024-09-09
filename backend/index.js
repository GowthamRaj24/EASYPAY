const express = require('express');
const connect = require('./db');
const cors = require('cors');

const users = require('./routes/users');
const transactions = require('./routes/transactions');
const contacts = require("./routes/contacts");
const qrcode = require("./routes/qrcode");

const app = express();
const port = 4001;

app.use(express.json());
app.use(cors({origin : '*'}));
connect.connect();

app.use('/users' , users.route);
app.use("/transactions" , transactions.route);
app.use("/contacts" , contacts.route);
app.use("/qrcode" , qrcode.route);

app.listen(port, () => {
    console.log(`listening to port ${port}`);
    }
);