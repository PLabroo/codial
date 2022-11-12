const express = require('express');
const app = express();

const port = 8000;

app.listen(port, function (err) {
    if (err)
    {
        console.log(`Error in firing express server: ${err}`);
        return;
    }
    console.log(`Server is running on port:${port}`);
})