import { hideAlert, showAlert } from './login.js';
import { bookTour } from './stripe.js';
const formData = document.querySelector('.form-user-data');
const formPassword = document.querySelector('.form-user-settings');
const bookbtn = document.getElementById('book-tour');

// type either data or password
const updateMe = async (data, type) => {
  try {
    const end = type === 'password' ? 'update-password' : 'updateme';
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/users/${end}`,
      data,
    });
    if (res.data.status === 'success')
      showAlert('success', `${type.toUpperCase()} updated successfully`);
  } catch (err) {
    showAlert('failed', err.response.data.message);
  }
};

if (formData) {
  formData.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('email', document.querySelector('#email').value);
    form.append('photo', document.querySelector('#photo').files[0]);
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    updateMe(form, 'data');
  });
}

if (formPassword) {
  formPassword.addEventListener('submit', function (e) {
    e.preventDefault();
    const passwordCurrent = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#password-confirm').value;
    updateMe({ passwordCurrent, password, confirmPassword }, 'password');
  });
}

if (bookbtn) {
  bookbtn.addEventListener('click', async (e) => {
    e.target.textContent = 'process ...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
