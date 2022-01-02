const account1 = {
      owner: 'Chirag rathod',
      pin: 1111,
      username: 'chirag',
}

const account2 = {
      owner: 'Darshak rathod',
      pin: 2222,
      username: 'darshak',
}

const accounts = [account1,
      account2];
console.log(accounts);

let currenaccount;
const userId = document.querySelector('.id');
const userPass = document.querySelector('.password');
const loginbtn = document.querySelector('.login__btn');
const container = document.querySelector('.contant');
const msg = document.querySelector('.msg');
const userform = document.querySelector('.user__form');
const Logout = document.querySelector('.log_out');

loginbtn.addEventListener('click', function (e) {
      e.preventDefault();
      currenaccount = accounts.find(acc => acc.username === userId.value);

      if (currenaccount?.pin === Number(userPass.value)) {
            container.style.visibility = 'visible';
            userform.style.visibility = 'hidden';

            msg.textContent = `Welcome back,  ${currenaccount.owner.split(' ')[0]}  in our App`
      }
});

// Logout.addEventListener('click', function (e) {
//       container.style.visibility = 'hidden';
//       userform.style.visibility = 'visible';
// })