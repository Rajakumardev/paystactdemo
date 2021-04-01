const express = require('express');
const app = express();
const cors = require('cors');
const { default: axios } = require('axios');
const transactionLog = require('./log/transactionlog');
const PORT = process.env.PORT || 8000;
//middlewares
app.use(express.json());
app.use(cors());

//root
app.get('/', (req, res) => {
    res.json({
        "test": "it works"
    });
});

//verify transaction with reference id
app.get('/verifypayment/:reference', (req, res) => {
    const url = `https://api.paystack.co/transaction/verify/${req.params.reference}`;
    axios.get(url, {
        headers: {
            'Authorization': 'Bearer sk_test_eb036fb6acd6d388694add407ed6da1d7202b946'
        }
    }).then((response) => {
        if (response.data.status) {
            res.json({
                status: 'success',
                reference: req.params.reference
            });
        } else {
            res.json({
                status: 'failed',
                reference: req.params.reference
            });
        }
    }).catch((error) => {
        res.json({
            status: failed
        });
    });
});


//webhook
app.post('/paystackwebhook', (req, res) => {
    transactionLog.push(req.body);
    res.send(200);
});

app.get('/transactionlog', (req, res) => {
    res.json({ transactionLog });
});

//server start
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('server started');
});