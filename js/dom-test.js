//Массив с объектами, объект = вопрос, ответы
const questions_data = [
    {
        id: 0,
        question: 'Когда с человеком может произойти дрожемент?',
        answers: [
            {
                id: '1',
                answer: 'Когда он боится, пугается',
                correct: true
            } ,
            {
                id: '2',
                answer: 'Когда он влюбляется',
                correct: false
            },
            {
                id: '3',
                answer: 'Когда он идет шопиться',
                correct: false
            },
            {
                id: '4',
                answer: 'Когда он слышит смешную шутку',
                correct: false
            }
        ],
        notice: 'Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят».'
    },
    {
        id: 1,
        question: 'Говорят, Антон заовнил всех. Это еще как понимать?',
        answers: [
            {
                id: '1',
                answer: 'Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?',
                correct: false
            } ,
            {
                id: '2',
                answer: 'Антон очень надоедливый и въедливый человек, всех задолбал',
                correct: false
            },
            {
                id: '3',
                answer: 'Молодец, Антон, всех победил!',
                correct: true
            },
            {
                id: '4',
                answer: 'Нет ничего плохого в том, что Антон тщательно выбирает себе друзей',
                correct: false
            }
        ],
        notice: 'Термин «заовнить» заимствован из английского языка, он происходит от слова own и переводится как «победить», «завладеть», «получить».'
    },
    {
        id: 2,
        question: 'А фразу «заскамить мамонта» как понимать?',
        answers: [
            {
                id: '1',
                answer: 'Разозлить кого-то из родителей',
                correct: false
            } ,
            {
                id: '2',
                answer: 'Увлекаться археологией',
                correct: false
            },
            {
                id: '3',
                answer: 'Развести недотепу на деньги',
                correct: true
            },
            {
                id: '4',
                answer: 'Оскорбить пожилого человека',
                correct: false
            }
        ],
        notice: 'Заскамить мамонта — значит обмануть или развести на деньги. Почему мамонта? Потому что мошенники часто выбирают в жертвы пожилых людей (древних, как мамонты), которых легко обвести вокруг пальца.'
    },
    {
        id: 3,
        question: 'Кто такие бефефе?',
        answers: [
            {
                id: '1',
                answer: 'Вши?',
                correct: false
            } ,
            {
                id: '2',
                answer: 'Милые котики, такие милые, что бефефе',
                correct: false
            },
            {
                id: '3',
                answer: 'Лучшие друзья',
                correct: true
            },
            {
                id: '4',
                answer: 'Люди, которые не держат слово',
                correct: false
            }
        ],
        notice: 'Бефефе — это лучшие друзья. Этакая аббревиатура от английского выражения best friends forever.'
    }
];
//Массив для проверки использовался данный вопрос или нет 
const use_question = [false, false, false, false];

//Получить ответ с сайта 
let input_answer = {};

const test = document.getElementById('test');
//Объект вопрос в общем смысле для вставки 
//html с содержанием вопроса и ответов
const questions = document.getElementById('test-questions');
//Результат прохождения теста
const results  = document.getElementById('results');
//Заметка для вопроса
const notice = document.getElementById('notice');
//Кнопка "Next" для перехода на следующий вопрос 
const btn_next = document.getElementById('btn-next');
//Кнопка "Check" для проверки ответа
const btn_check = document.getElementById('btn-check');
const question_end = document.getElementById('question-end');

//Индекс текущего вопроса (в массиве)
let question_index = 0;
//Счетчик вопросов 
let question_counter = 0;
//Количество правильных ответов
let rightAnswer_counter = 0;
//Текущий ответ правильный или нет
let currentAnswerCorrect = false;

//Генерация вопросов на входе = индекс вопроса
const render_questions = (index) => {
    //Внутри генерация ответов
    render_answers = () => {
        //В данный массив в рандомном порядке будем помещать ответы в виде html кода
        let result = [];
        //Массив флагов, которые говорят использовался вопрос или нет
        let answer_use = [false, false, false, false];

        
        for ( let i = 0; i < answer_use.length; i++) {
            //Выбираем рандомное число = id вопроса 
            let current_answ = getRandomNumber(0, answer_use.length - 1);
            //Если этот вопрос уже добавлен в массив - меняем id
            while (answer_use[current_answ]) {
                current_answ = getRandomNumber(0, answer_use.length - 1);
            }
            //Отмечаем, что вопрос используется
            answer_use[current_answ] = true;
            //Добавляем строку в результат 
            result[i] = 
            `
            <li>
            <div class="answer-div" id="${questions_data[index].answers[current_answ].id}" name="${index}" value="${questions_data[index].answers[current_answ].id}">
                ${questions_data[index].answers[current_answ].answer}
            </div>
            </li>
            `
        }
        return result.join('');
    }
    questions.innerHTML = `
    <div class="test-questions" id="test-questions">
        <div class="test-questions-item" id="test-question-item">
            <div class="item-question" id="item-question">${question_counter + 1}. ${questions_data[index].question}</div>
            <ul class="item-answer" id="item-answer">${render_answers()}</ul>
        </div>
    `;
};

//Функция для генерации результата 
const render_results = () => {
    results.innerHTML =
    `
    <div class="end-message" id="end-message">The questions are over</div>
    <div class="result" id="result">Your result: ${rightAnswer_counter}/${questions_data.length} ${getResultPrecent()}</div>
    `
};

function getResultPrecent() {
    return (100*(rightAnswer_counter/questions_data.length)).toString()+'%';
}

function render_all_questions() {
    return questions_data
    .map((ques) => 
        `
        <li>
        <div class="item-question-end" id="question_end_${ques.id}" name="${ques.id}">${ques.question}</div>
        </li>
        `
    )
    .join('');
}

//Создаем корректную заметку и результат для данного ответа
function render_notice(correct, index) {
    //Выбираем цвет 
    let correct_color = correct ? 'style="color: green;"' : 'style="color: red;"';
    //Выбираем проверку результата
    let correct_str = correct ? 'You right!:)' : 'Wrong answer:(';
    notice.innerHTML = `
    <div class="check_res" id="check_res" ${correct_color}>${correct_str}</div>
    <div class="notice_text" id="notice_text">${questions_data[index].notice}</div>
    `;
    //Делаем блоки видимыми 
    notice.style.display = 'block';
    currentAnswerCorrect = correct;
}

//Нажатие на область теста
test.addEventListener('click', (e) => {
    //Если нажимаем на вариант ответа
    if (e.target.classList.contains('answer-div')) {
        //Добавляем информацию о нем в объект input_answer
        input_answer[e.target.getAttribute("name")] = e.target.getAttribute("value");

        //Делаем кнопку "Check" доступной
        btn_check.disabled = false;
    }
});

//Нажание кнопки Next
btn_next.addEventListener('click', (e) => {

    if (currentAnswerCorrect){
        rightAnswer_counter++;
    }

    if (question_counter == questions_data.length) {
        questions.style.display = 'none';
        notice.style.display = 'none';
        render_results();
        question_end.innerHTML = 
        `
        ${render_all_questions()}
        `;
        results.style.display = 'block';
        btn_next.disabled = true;
        btn_check.disabled = true;
        question_end.addEventListener('click', (e) => {
            if (e.target.classList.contains('item-question-end')) {
                let index = e.target.getAttribute("name");
                let current_question_end = document.getElementById('question_end_' + index);
                current_question_end.innerHTML = 
                `
                <div class="answer_end" id="answer_end_${index}">
                    ${getRigthAnswer(index)}
                </div>
                `;
                current_question_end.style.backgroundColor = "rgb(171, 243, 206)";
            }
        });
        btn_check.style.display = 'none';
        btn_next.style.display = 'none';
    } else {
        //Вывод на экран следующего вопроса
        question_index = getRandomQuestion();
        render_questions(question_index);
        question_counter++;
        //Сделеть кнопку "Next" недоступной
        btn_next.disabled = true;
        //Сделать заметку снова невидимой
        notice.style.display = 'none';
    }
});

function getRigthAnswer(index) {
    let answers_data = questions_data[index].answers;
    for (let i = 0; i < answers_data.length; i++) {
        if (answers_data[i].correct) {
            return answers_data[i].answer;
        }
    }
}

//Нажатие кнопки Check
btn_check.addEventListener('click', (e) => {
    //Получим индекс выбранного ответа
    let input_answer_index = Number(input_answer[question_index]) - 1;

    //"Уберем" вправо все невыбранные ответы
    for (let i = 0; i < 4; i++){
        if (i != input_answer_index){
            moveAndDisappear(document.getElementById(String(i + 1)));
        }
    }
    
    //Вывод корректности ответа и заметка к ответу
    if (questions_data[question_index].answers[input_answer_index].correct == true) {
        render_notice(true, question_index);
    } else {
        render_notice(false, question_index);
    }

    //Доступ для нажания кнопки "Next"
    btn_next.disabled = false;
    //Сделеть кнопку "Check" недоступной
    btn_check.disabled = true;
});

//Начальное создание самого первого вопроса
question_index = getRandomQuestion();
render_questions(question_index);
question_counter++;

//Функция для передвижения и "исчезнования" невыбранных ответов
function moveAndDisappear(object) {
    var position = 0;
    var opacity = 1;

    var interval = setInterval(function() {
        position += 10;
        object.style.left = position + "px"; 

        if (position >= window.innerWidth) {
            clearInterval(interval);
            disappear(); 
        }
    }, 10); 

    function disappear() {
        var fadeOutInterval = setInterval(function() {
        opacity -= 0.05;
        object.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(fadeOutInterval);
            object.style.display = "none";
        }
        }, 50);
    }
}

//Функция для получения рандомного числа 
function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

function getRandomQuestion() {
    let dataLength = questions_data.length;
    if (question_counter == dataLength) {
        return -1;
    }

    let currentQuestion = getRandomNumber(0, dataLength - 1);
    while (use_question[currentQuestion]) {
        currentQuestion = getRandomNumber(0, dataLength - 1);
    }
    use_question[currentQuestion] = true;

    return currentQuestion;
}
