class List {
    /*
    При создании экземпляра листа, помещаем в него "тупиковую" запись. 
    Это будет голова, к которой можно обращаться как ко
    всему списку.
    */
    constructor(data = "", tail = null) {
        this.head = {
            data,
            tail
        };
    };

    /*
    При добавлении нового узла, старую голову помещаем в tail, а в новую голову кладем данные.
    Его хвост теперь указывает на предыдущую голову.
    */
    push(data) {
        const tail = new List(this.head.data, this.head.tail);
        // Вместо создания просто контейнера, создаем целый объект, который хранит предыдущие
        // Данные головы
        this.head = {
            // Новая голова указывает на старую голову и хранит переданные данные
            data,
            tail
        };
    };

    /*
    Алгоритм почти такой же, как и при добавлении. Голову сохраняем в head,
    После проверяем, есть ли хвост у головы,
    Если да, то этот хвост "выносится" вперед и становится новой головой,
    Если нет, то просто возвращаем старую голову. 
    */
    pop() {
        const head = this.head.data;
        if ( this.head.tail !== null ) {
            //Помещаем в голову её хвост, таким образом "выталкивая" её в никуда.
            this.head = this.head.tail.getHead();
        }
        return head.data;
    }

    /* Функция распечатки листа в консоль */
    print() {
        const array = this.getArray();
        array.map((item) => console.log(item));
    }

    /* Функция выдачи "головы" */
    getHead() {
        return this.head;
    }

    /* 
    Функция, что проходит по всему листу, пока не наткнутся на узел, у которого хвост === null
    и сохраняет каждый пройденный узел в массив, который после этого возвращает.
    */
    getArray() {
        // Объявляем массив
        const array = [];
        // Помещаем голову в переменную, как x0
        let node = this.head;
        // Пока у узла, хранящегося в переменной, есть хвост, делаем
        while( node.tail !== null ) {
        // Добавляем в массив дату, хранящуюся в узле
            array.push(node.data);
        // Переменная переключается на узел, находящийся в хвосте текущей переменной
            node = node.tail.getHead();
        }
        return array;
    }
}

class ReqursiveList {
    constructor() {
        this.head = new List();
    }
}

/*
Графическая функция. 
Принимает 
    content - узел html, в который нужно поместить содержимое листа
    list - сам объект класса List
*/
const renderList = function ( content, list ) {
    // Обнуляем содержимое узла
    content.innerHTML = '';
    // Получаем массив из списка
    const array = list.getArray();
    list.print();
    // Превращаем массив в массив узлом html
    const result = array.map((item) => {
        const li = document.createElement('li');
        li.append(item);
        return li;
    })
    // Помещаем массив узлов в html в переданный узел
    content.append(...result);
}

// Создаем объект типа List
const list = new List();
// Находим на странице узел с тегом form (это поле для ввода и кнопки сохранить и удалить)
const form = document.querySelector('form');
// Находим узел с id = content
const content = document.querySelector('#content');
// Находим кнопку Удалить по тегу id = delete
const deleteB = document.querySelector('#delete');

// Рисуем первый раз содержимое списка
renderList(content, list);

// Функция, срабатывающая при отправке формы
const onsubmit = function (event) {
    // Функция браузерного Javascript, запрещающего отправлять на другую страницу при отправке формы
    event.preventDefault();
    /*
     Записываем в переменную значение поля ввода 
     (он находится в форме (которая тут обозначена как target) под индексом 0)
    */
    const value = event.target[0].value;
    // Если значение существует
    if (value === '***') {
        // И перерисовываем страницу
        renderList(content, list);
        // Ничего не добавляем
        return;
    }
    if (value !== undefined) {
        // Сохраняем его в список
        list.push(value);
        // Опустошаем поле ввода
        event.target[0].value = '';
    }
}

// Функция, срабатывающая при нажатии кнопки Удалить
const ondelete = function (event) {
    // Удаляем верхний элемент из списка
    list.pop();
    // Перерисовываем страницу
    renderList(content, list);
}

// Присваиваем форме и кнопке удаления соотвествующие функции
form.onsubmit = onsubmit;
deleteB.onclick = ondelete;

