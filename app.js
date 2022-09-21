const express = require('express');
const app = express();
const path = require('path');
const {v4} = require('uuid') // id generator

// БД
let AFFAIRS = [
    {id: v4(), name: 'Wake', value: 'Wake at 08:00', marked: false}
]

/// Добавим Middlewere который будет работать с респонсом
app.use(express.json())

/// GET
app.get('/api/affairs', (req, res) => {
    // setTimeout(() => { /// Делаем задержку, чтобы увидеть колесо
        res.status(200).json(AFFAIRS)
    // }, 1000)
    
})

/// POST
app.post('/api/affairs', (req, res) =>{
    // console.log(req.body)
    const affair = {...req.body, id: v4(), marked: false}
    AFFAIRS.push(affair)
    res.status(201).json(affair)
})

///DELETE
app.delete('/api/affairs/:id', (req, res) => {
    AFFAIRS = AFFAIRS.filter(c => c.id !== req.params.id)
    res.status(200).json(AFFAIRS)
})

///PUT
app.put('/api/affairs/:id', (req, res) => {
    const index = AFFAIRS.findIndex(c => c.id === req.params.id)
    AFFAIRS[index] = req.body
    res.json(AFFAIRS[index])
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