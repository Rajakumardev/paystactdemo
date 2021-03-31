const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        "test": "it works"
    });
})
app.listen(3000, (err) => {
    if (err) throw err;
    console.log('server started');
})