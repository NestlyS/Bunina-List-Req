class List {
    /*
    При создании экземпляра листа, помещаем в него "тупиковую" запись
    со звездочками. Это будет голова, к которой можно обращаться как ко
    всему списку.
    */
    constructor() {
        this.head = {
            data: "***",
            tail: null
        };
    };

    /*
    При добавлении нового узла, старую голову помещаем в tail, а в новую голову кладем данные.
    Его хвост теперь указывает на предыдущую голову.
    */
    push(data) {
        const tail = {
            // Помещаем данные головы в подобный объект, сохраняя
            data: this.head.data,
            tail: this.head.tail
        };
        this.head = {
            // Новая голова указывает на старую голову и хранит переданные данные
            data: data,
            tail: tail
        }
    };

    /*
    Алгоритм почти такой же, как и при добавлении. Голову сохраняем в head,
    После проверяем, есть ли хвост у головы,
    Если да, то этот хвост "выносится" вперед и становится новой головой,
    Если нет, то просто возвращаем старую голову. 
    */
    pop() {
        const head = {
            data: this.head.data,
            tail: this.head.tail
        };
        if ( this.head.tail !== null ) {
            //Помещаем в голову её хвост, таким образом "выталкивая" её в никуда.
            this.head = this.head.tail;
        }
        return head.data;
    }

    /* Функция распечатки листа в консоль */
    print() {
        const array = this.getArray();
        array.map((item) => console.log(item));
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
            array.push(node.data)
        // Переменная переключается на узел, находящийся в хвосте текущей переменной
            node = node.tail;
        }
        // Добавляем данные последнего узла в массив (три звездочки)
        array.push(node.data);
        return array;
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
    if (value !== undefined) {
        // Сохраняем его в список
        list.push(value);
        // И перерисовываем страницу
        renderList(content, list);
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

