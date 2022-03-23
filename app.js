const express = require('express');
const app = express();
const path = require('path')




// Создаём статическую папку
app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})


app.listen(3000, () => console.log('Server has been started on port:3000...'));