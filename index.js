const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pizzahut_menu',
});
connection.connect();

app.get('/', (req, res) => {
  const getAll = 'SELECT * FROM `menu_list`';

  connection.query(getAll, (err, result) => {
    if (err) throw err;
    const data = JSON.parse(JSON.stringify(result));
    res.render('index', { datas: data });
  });
});

app.post('/submit', (req, res) => {
  const { nama_menu, harga_personal, harga_reguler, harga_large } = req.body;
  const createData = `INSERT INTO menu_list (nama_menu, harga_personal, harga_reguler, harga_large) VALUES ('${nama_menu}', '${harga_personal}', '${harga_reguler}', ${harga_large})`;
  connection.query(createData, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/delete', (req, res) => {
  const { id_barang } = req.body;
  const deleteData = `DELETE FROM menu_list WHERE id = ${id_barang}`;
  connection.query(deleteData, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/delete', (req, res) => {
  const { id_barang } = req.params;
  const deleteData = `DELETE FROM menu_list WHERE id = ${id_barang}`;
  connection.query(deleteData, (err, result) => {
    if (err) throw err;
    console.log('data deleted')
    console.log(err.message)
    res.redirect('/');
  });
});

// app.post('/edit', (req, res) => {
//   const {id_barang} = req.params;
//   const { nama_menu, harga_personal, harga_reguler, harga_large } = req.body;
//   const updateData = ``
  
// })

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
