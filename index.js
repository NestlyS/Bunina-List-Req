class List {
    constructor() {
        this.head = {
            data: "***",
            tail: null
        };
    };

    push(data) {
        const tail = {
            data: this.head.data,
            tail: this.head.tail
        };
        this.head = {
            data: data,
            tail: tail
        }
    };

    pop() {
        const head = {
            data: this.head.data,
            tail: this.head.tail
        };
        if ( this.head.tail !== null ) {
            this.head = this.head.tail;
        }
        return head.data;
    }

    print() {
        const array = this.getArray();
        array.map((item) => console.log(item));
    }

    getArray() {
        const array = [];
        let node = this.head;
        while( node.tail !== null ) {
            array.push(node.data)
            node = node.tail;
        }
        array.push(node.data);
        return array;
    }
}

const renderList = function ( content, list ) {
    content.innerHTML = '';
    const array = list.getArray();
    const result = array.map((item) => {
        const li = document.createElement('li');
        li.append(item);
        return li;
    })
    content.append(...result);
}

const list = new List();
const form = document.querySelector('form');
const content = document.querySelector('#content');
const deleteB = document.querySelector('#delete');

renderList(content, list);

const onsubmit = function (event) {
    event.preventDefault();
    console.log('Hello');
    const value = event.target[0].value;
    if (value !== undefined) {
        list.push(value);
        renderList(content, list);
    }
}

const ondelete = function (event) {
    list.pop();
    renderList(content, list);
}

form.onsubmit = onsubmit;
deleteB.onclick = ondelete;

