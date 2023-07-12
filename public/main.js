const createData = document.getElementById('create-data');
const editData = document.getElementById('edit-data');
const button = document.querySelector('.button-container');
const backButton = document.getElementById('back');

backButton.style.display = 'none';
createData.style.display = 'none';
editData.style.display = 'none';

const addData = () => {
  createData.style.display = 'block';
  button.style.display = 'none';
  backButton.style.display = 'block';
};

const updateData = () => {``
  editData.style.display = 'block';
  button.style.display = 'none';
  backButton.style.display = 'block';
}


