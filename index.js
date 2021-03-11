import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
//Port yang digunakan diletakkan di bawah ini
const PORT = process.env.PORT || 3001
app.use(cors())

const mongo_address = 'alamat database mongoDB diletakkan di sini'  
mongoose.connect(mongo_address, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err))

var dataSchema = new mongoose.Schema(
  {data: Object, time: String
  },{versionKey: false},{_id: false})

app.use(express.json())

app.get('/data/:col', (req, res) => {
  const col = req.params.col
  const query_data = req.query.data
  const query_time = req.query.time
  const query_single = req.query.single
  const query_limit = req.query.limit
  const parse_limit = parseInt(req.query.limit)
  const regex_time = new RegExp(query_time, 'i')
  const regex_data = new RegExp(query_data, 'i')
  var data_model = mongoose.model('data', dataSchema, col)
  if(query_limit>0){
  //Di bawah ini hanyalah bagian dari kode yang bertujuan untuk mencari file dari database dan melakukan filtering
    if(query_time){
      data_model.find({"time": regex_time}).sort({time: -1}).limit(parse_limit)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.send(err)
      })}

     else if (query_data){
      data_model.find({"data": regex_data}).sort({time: -1}).limit(parse_limit)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.send(err)
      })}
     else{
      data_model.find({}).sort({time: -1}).limit(parse_limit)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.send(err)
      })}
  } else {
    if(query_time){
      data_model.find({"time": regex_time}).sort({time: -1})
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.send(err)
      })}
     else if (query_data){
      data_model.find({"data": regex_data}).sort({time: -1})
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.send(err)
      })}
      else if (query_single==1){
        data_model.findOne({}).sort({time: -1}).limit(1)
        .then(result => {
          res.json(result)
        })
        .catch(err => {
          res.send(err)
        })}
     else{
      data_model.find({}).sort({time: -1})
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.send(err)
      })}
  }
})

app.post('/data', (req, res) => {
  console.log(`POST ROUTE REACHED`) 
  const data_sensor = req.body
  var data_model = mongoose.model('data', dataSchema, data_sensor.col)
  var dt = data_sensor.time
  let parsed_time = new Date(dt[0],dt[1]-1,dt[2],dt[3]+7,dt[4],dt[5]) 
  const data_save = new data_model({
     data: data_sensor.data,
     time: parsed_time,
   })
  data_save.save()                    //bagian yang bertugas menyimpan data ke database
    .then(saved_data => {
       res.json(saved_data)
       console.log(saved_data)
    })
    .catch(err => {
       console.log(err)
       res.send(err)
    })
  
})

app.listen(PORT, () => {
    console.log(`Server running`)
})
