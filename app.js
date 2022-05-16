const express = require('express');
const app = express();
const path = require('path');
const {v4} = require('uuid') // id generator

// БД
const CONTACTS = [
    {id: v4(), name: 'Den', value: '8-929-977-92-95', marked: false}
]

app.use(express.json())

/// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => { /// Делаем задержку, чтобы увидеть колесо
        res.status(200).json(CONTACTS)
    }, 1000)
    
})

/// POST
app.post('/api/contacts', (req, res) =>{
    console.log(req.body);
    res.json({test: 1})
})

/// Следующие запросы должны быть последними:
// Создаём статическую папку, чтобы index нашёл frontend.js
app.use(express.static(path.resolve(__dirname, 'client')))
// при любых гет запросах открывает файл:
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

// Запускаем сервер
app.listen(3000, () => console.log('Server has been started on port:3000...'));