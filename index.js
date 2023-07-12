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
  const postData = `INSERT INTO menu_list (nama_menu, harga_personal, harga_reguler, harga_large) VALUES ('${nama_menu}', '${harga_personal}', '${harga_reguler}', ${harga_large})`;
  connection.query(postData, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/delete/:id_barang', (req, res) => {
  const { id_barang } = req.params;
  const deleteData = `DELETE FROM menu_list WHERE id = ${id_barang}`;
  connection.query(deleteData, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/edit', (req, res) => {
  const { id_barang, nama_menu, harga_personal, harga_reguler, harga_large } = req.body;
  const editData = `UPDATE menu_list SET nama_menu = '${nama_menu}', harga_personal = ${harga_personal}, harga_reguler = ${harga_reguler}, harga_large = ${harga_large}  WHERE id = ${id_barang}`;
  connection.query(editData, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
