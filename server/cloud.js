export function get(table) {
    var tablee = [];
    db.collection(table).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            tablee.push(doc.data());
        });
    })
    return tablee;
}
export function set(table, doc) {
    db.collection(table).add(doc);
    return 'sent!';
}
export function live(table) {
    var tablee = [];
    db.collection(table).orderBy('date').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                render(change.doc);
            } else if (change.type == 'removed') {
                let li = mainDiv.querySelector('[data-id=' + "a" + change.doc.id + ']');
                mainDiv.removeChild(li);
            }
        });
    });
    function render(doc) {
        const mainDiv = document.getElementById('mainDiv');

        let li = document.createElement('li');
        let Sender = document.createElement('p');
        let Content = document.createElement('p');
    
        li.setAttribute('data-id', "a" + doc.id);
        li.setAttribute('class', 'field');

        Sender.id = "sender";
        Content.id = "content";
    
        Sender.textContent = /*"Sender: " + */doc.data().sender + "\n";
        Content.textContent = /*"Content: " + */doc.data().content;
    
        li.appendChild(Sender);
        li.appendChild(Content);
    
        mainDiv.appendChild(li);

        const scroll = document.getElementById('mainDiv');
        scroll.scroll({ top: scroll.scrollHeight, behavior: 'smooth'});
    }
}
