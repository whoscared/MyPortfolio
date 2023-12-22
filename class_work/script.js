var result = confirm("Приступаем?");
if (result) {
    document.writeln("Жизнь продолжается и мы должны двигаться дальше");
} else {
    document.writeln("Даже камень движется дальше");
}

var distance = prompt("Введите длину пути");
if (distance <= 0) {
    alert("Путь не может быть <= 0");
}

var abc = document.getElementById('abc');
abc.appendChild


function calculate(vehicle) {
    let gasolineAmount = document.getElementById('gasolineAmount').value;
    let pathLength = distance;


    let consumption;
    if (vehicle === 'moto') {
        consumption = 5;
    } else if (vehicle === 'car') {
        consumption = 10;
    } else {
        return;
    }

    let possibleDistance = gasolineAmount / consumption * 100;
    let resultImg = document.getElementById('resImg');

    if (possibleDistance >= pathLength) {
        resultImg.src = "img/sm_1.png";
    } else {
        resultImg.src = "img/sm_2.png";
    }
}

function getRes() {
    let length = document.getElementById('number').value;
    let checkBox = document.getElementById('type');

    let step;
    if (checkBox) {
        step = 4;
    } else {
        step = 3;
    }
    let result = length/step;
    if (length % step > 0) {
        result++;
    }
    document.getElementById('result').innerText = result;
}