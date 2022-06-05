import { set, get, live } from './cloud.js';

const form = document.getElementById('send');
const form2 = document.getElementById('Name');

window.onload = function() {
    form2.getElementsByTagName('input')[0].value = '';
    form2.getElementsByTagName('input')[0].focus();
    form2.getElementsByTagName('input')[0].select();
};

live('messages');

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form2.name.value) {
        form2.style.display = 'none';
        document.getElementById('mainDiv').style.display = 'block';
        document.getElementById('send').style.display = 'flex';
        const scroll = document.getElementById('mainDiv')
        scroll.scroll({ top: scroll.scrollHeight, behavior: 'smooth'})
    } else {
        alert('Please enter your name!');
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form2.name.value && form.message.value) {
        set('messages',{
            sender: form2.name.value,
            content: form.message.value,
            date: new Date().getTime()
        });
        form.message.value = '';
    } else if (!form2.name.value) {
        alert('Please enter your name first!');
    }
});