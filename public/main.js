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

const updateData = () => {
  editData.style.display = 'block';
  button.style.display = 'none';
  backButton.style.display = 'block';
};

document.addEventListener('DOMContentLoaded', function () {
  const editButtons = document.querySelectorAll('.edit-btn');

  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const id = this.dataset.id;
      history.pushState(null, null, `/edit/${id}`);
      console.log(`URL updated to /edit/${id}`);

      let pathName = window.location.pathname;
      console.log(pathName);

      const extractIdFromUrl = (path) => {
        const splitedUrl = path.split('/');
        return splitedUrl[2];
      };

      const extractedUrl = extractIdFromUrl(pathName);
      editData.action = `/edit/${extractedUrl}`;
    });
  });
});
