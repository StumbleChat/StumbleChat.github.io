import { set, get, live } from './cloud.js';

const form = document.getElementById('send');
const form2 = document.getElementById('Name');

window.onload = function() {
    form.getElementsByTagName('input')[0].focus();
    form.getElementsByTagName('input')[0].select();
};

live('messages');

console.log(get('messages'));

form.addEventListener('submit', (e) => {
    e.preventDefault();
    set('messages',{
        sender: form2.name.value,
        content: form.message.value,
        date: new Date().getTime()
    });
    form.message.value = '';
});