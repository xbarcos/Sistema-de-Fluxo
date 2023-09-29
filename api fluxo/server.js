const express = require('express')
const mongoose = require('mongoose')
const Flux = require('./models/fluxModel')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.setHeader('Content-Range','bytes : 0-9/*')
    next(); 
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb://127.0.0.1:27017/flux-api')
    .then(() => {
        console.log('Conexão concluída ao Banco de Dados MongoDB')
        app.listen(3000, ()=> {
            console.log(`API rodando na porta 3000`)
        });
    }).catch((error) => {
        console.log(error)
    })

app.get('/', (req, res) => {
    res.send('Starting API')
})

app.get('/dev', (req, res) => {
    res.send('Teste Request /GET')
})

app.get('/bills', async(req, res) => {
    try {
        const bills = await Flux.find({});
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/bills/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const bill = await Flux.findById({_id: id});
        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/bills', async(req, res) => {
    try {
        const bill = await Flux.create(req.body)
        res.status(200).json(bill);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update
app.put('/bills/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const bill = await Flux.findByIdAndUpdate(id, req.body);
        // we cannot find any bill in database
        if(!bill){
            return res.status(404).json({message: `cannot find any bill with ID ${id}`})
        }
        const updatedBill = await Flux.findById(id);
        res.status(200).json(updatedBill);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete

app.delete('/bills/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const bill = await Flux.findByIdAndDelete({_id: id});
        if(!bill){
            return res.status(404).json({message: `cannot find any bill with ID ${id}`})
        }
        res.status(200).json(bill);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
