var cvs = document.getElementById("canvas"); // объект из html документа
var ctx = cvs.getContext("2d"); // отвечает за вид игры

var bird = new Image();  // объекты image (птица)
var bg = new Image();  //задний фон
var fg = new Image();  //передний фон
var pipeUp = new Image();  // верхнее перпятствие
var pipeBottom = new Image();  // нижнее препятствие

bird.src = "img/bird.png";  // загружаю все изображения
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();  // объекты audio
var score_audio = new Audio();  // объекты audio

fly.src = "/audio/fly.mp3";
score_audio.src = "/audio/score.mp3";

var gap = 110;  // отступ между верхним и нижним блоками

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);  // отслеживаем какое-либо действие и вызываем функцию moveUp - она подкидывает птичку

function moveUp() {
 yPos -= 35;  // берет позиция птички по y и поднимаем её на 20 единиц выше
 fly.play();  // проигрывается звук полёта
}

// Создание блоков
var pipe = [];  // создаю пустой массив

pipe[0] = {  // добавляю объект
 x : cvs.width,  // координата по х (первый объект будет находится за экраном)
 y : 0  // координата по у (изначально будет находится вверху)
}

var score = 0;  // переменная счёта
// Позиция птички
var xPos = 10;  // позиция птички по x
var yPos = 150;  // позиция птички по y
var grav = 1.5;  // для падения птички

function draw() {  // отрисовка объекта в канвасе
 ctx.drawImage(bg, 0, 0);  // берем объект канваса и в нем рисуем картинку (что отрисовываю, координаты по х , координаты по у)

 for(var i = 0; i < pipe.length; i++) {  // цикл для создания блоков
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);  // отрисовка объекта в канвасе (верхнее препятствие) (объект отрисовки, координата по х и координата по у)
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);  // отрисовка объекта в канвасе (нижнее препятствие)

 pipe[i].x--;  // чтобы блоки передвигались, мы берем наш блок, который сейчас рассматриваем в цикле, берем его позицию по х и отнимаем от нее 1

 if(pipe[i].x == 125) {  // чтобы было много блоков. Беру блок, его позицию по х и если она находится в 125 пикселях, то создаем новый блок
 pipe.push({  // добавляю новый объект в массив pipe
 x : cvs.width, // ширина, чтобы блоки появлялись справа за экраном
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height  // случайное число, чтобы проходы между блоками генерировались в случайном месте. Округляем(рандом * высоту) - высота
 });
 }

 // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x  // если птичка находится в пределах ширины блока и если она находится в пределах высоты, то перепазпускаю странису и начинается игра заново
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {  // обработка столконовения с землёй
 location.reload(); // Перезагрузка страницы
 }

 if(pipe[i].x == 5) {  // если позиция блока по х равна 5, то есть птичка его точно прошла
 score++;  // то счёт увеличиваем на 1
 score_audio.play();  // звук увеличеня счёта
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);  // отрисовка объекта в канвасе
 ctx.drawImage(bird, xPos, yPos);  // отрисовка объекта в канвасе

 yPos += grav;

 ctx.fillStyle = "#000";  // стиль для текста счёта
 ctx.font = "24px Verdana";  // шрифт для текста
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);  // устанавливаю сам текст счёта, второмы аргументов указываю, где отображать этот счёт

 requestAnimationFrame(draw);  // для падения птички
}

pipeBottom.onload = draw;  // когда последняя картинка загружена в объект, вызываем функцию draw


