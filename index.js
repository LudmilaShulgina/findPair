// Функция, которая генерирует карточку
// как в первом уроке, только с помощью JS 
const generateCard = (back) => {
    let scene = document.createElement('div');
    scene.classList.add("scene", "scene--card");

    let card = document.createElement('div');
    card.classList.add("card");

    let card__face = document.createElement('div')
    card__face.classList.add('card__face', 'card__face--front');
    card__face.textContent = 'front';

    let card__back = document.createElement('div')
    card__back.classList.add('card__face', 'card__face--back');
    card__back.textContent = back;

    card.appendChild(card__face);
    card.appendChild(card__back);

    scene.appendChild(card);

    return scene
}

// В моей игре будет 4 масти ♤ ♧ ♥ ♢
// Из них мне нужно составить квадрат 4*4, в котором будет равное количество мастей
// Т.е. у меня будет по 4 пары каждой масти, которые еще неплохо бы и перемешать) 
const pairs = ['♤', '♧', '♥', '♢']
//Нам нужен массив, состоящий из 4х таких. 
const cardList = pairs.concat(pairs).concat(pairs).concat(pairs)
//Осталось рандомно перемешать массив, чтобы наша игра была действительно интересной

//Функция для рандомного перемешивания массива, который я честно мкопировала из stackoverflow
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

//Перемешиваем карточки: 
const shuffledCards = shuffle(cardList)

//Генерируем карточки на основании нашего созданного массива

for (const item of shuffledCards) {
    //Создаю карточку
    const card = generateCard(item);
    //Добавляю их в контейнер
    document.querySelector('#container').appendChild(card);
}


//Подписываюсь на событие на щелчок карточек
//По правилам, мы открываем одну карточку, затем вторую. 
// Если они совпали, то они исчезают, а если нет, закрываются обратно

const cards = document.querySelectorAll('.card');


//Каждую карточку подписываем на событие клика
[...cards].forEach((card) => {
    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
        checkCoincidence(); //При каждом щелчке выполняем проверку
    });
});

//Функция, которая проверяет совпадение
const checkCoincidence = () => {
    //Находим все перевернутые карточки
    const cardsFlipped = document.querySelectorAll('.is-flipped');
    //Если их 2, то выполняем проверку
    if (cardsFlipped.length >= 2) {
        const first = cardsFlipped[0].getElementsByClassName("card__face--back")[0].innerHTML;
        const second = cardsFlipped[1].getElementsByClassName("card__face--back")[0].innerHTML;

        //Проверяем, равны ли значения
        if (first == second) {
            //setTimeout мы еще не прошли, но это функция помогает воспроизвести код
            // c задержкой. Я добавила его, чтобы карточки не закрывались слишком быстро
        
            setTimeout(() => {
                //Прячем ячейки, если угадали
                [...cardsFlipped].forEach((card) => {
                    card.classList.add('is-hiden');
                    card.classList.remove('is-flipped');
                    
                });
            },1000)

        } else {
            //setTimeout мы еще не прошли, но это функция помогает воспроизвести код
            // c задержкой. Я добавила его, чтобы карточки не закрывались слишком быстро
        
            setTimeout(() => {
                //Закрываем ячейки, если не угадали
                [...cardsFlipped].forEach((card) => {
                    card.classList.toggle('is-flipped');
                });
            },1000)

        }
    }
}