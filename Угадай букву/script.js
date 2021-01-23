const words = ['прокрастинация', 'милитаризация', 'конкатенация'],
    guessBtn = document.querySelector('#guess'),
    newGameBtn = document.querySelector('#new_game'),
    canvas = document.querySelector('#canvas');

class Figure{
    constructor(){
        this.ctx = canvas.getContext('2d');
        this.stage = 0;
    }

    drawHead(){
        this.ctx.arc(400, 135, 40, 0, 2*Math.PI, false);
        this.ctx.stroke();
    }

    drawNeck(){
        this.ctx.moveTo(400, 175);
        this.ctx.lineTo(400, 200);
        this.ctx.stroke();
    }

    drawLeftHand(){
        this.ctx.moveTo(400, 200);
        this.ctx.lineTo(340, 260);
        this.ctx.stroke();
    }

    drawRightHand(){
        this.ctx.moveTo(400, 200);
        this.ctx.lineTo(460, 260);
        this.ctx.stroke();
    }

    drawBody(){
        this.ctx.moveTo(400, 200);
        this.ctx.lineTo(400, 300);
        this.ctx.moveTo(400, 300);
        this.ctx.stroke();
    }

    drawLeftLeg(){
        this.ctx.lineTo(340, 370);
        this.ctx.moveTo(400, 300);
        this.ctx.stroke();
    }

    drawRightLeg(){
        this.ctx.lineTo(460, 370);
        this.ctx.moveTo(400, 300);
        this.ctx.stroke();
    }

    drawStagePicture(){
        this.ctx.strokeStyle = '#508DCD';
        this.ctx.beginPath();
        switch(this.stage){
            case 0: break;
            case 1:
                this.drawHead();
                break;
            case 2:
                this.drawHead();
                this.drawNeck();
                break;
            case 3:
                this.drawHead();
                this.drawNeck();
                this.drawLeftHand();
                break;
            case 4:
                this.drawHead();
                this.drawNeck();
                this.drawLeftHand();
                this.drawRightHand();
                break;
            case 5:
                this.drawHead();
                this.drawNeck();
                this.drawLeftHand();
                this.drawRightHand();
                this.drawBody();
                break;
            case 6:
                this.drawHead();
                this.drawNeck();
                this.drawLeftHand();
                this.drawRightHand();
                this.drawBody();
                this.drawLeftLeg();
                break;
            case 7:
                this.drawHead();
                this.drawNeck();
                this.drawLeftHand();
                this.drawRightHand();
                this.drawBody();
                this.drawLeftLeg();
                this.drawRightLeg();
                break;
            default: 
                this.drawHead();
                this.drawNeck();
                this.drawLeftHand();
                this.drawRightHand();
                this.drawBody();
                this.drawLeftLeg();
                this.drawRightLeg();
                break;
        }
    }
}

class Game{
    constructor(words, canvas){
        this.figure = new Figure();
        this.words = words;
        this.word = '';
        this.answer = [];
        this.usedLetters = [];
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.remain;
        this.tries;
    }

    getRandomWord(){
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

    drawCanvasBorders(){
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo( this.width, 0);
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.lineTo(0, 0);
        this.ctx.strokeStyle = "#845FBB";
        this.ctx.stroke();
    }
    
    drawWord(){
        this.ctx.font = 'bold 30px sans-serif';
        this.ctx.fillStyle = '#845FBB';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.answer.join(' '), this.width/2, 40); 
    }
    
    drawUsersInfo(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.font = 'bold 18px sans-serif';
        this.ctx.fillStyle = '#845FBB';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Осталось: ${this.remain}, ваши попытки: ${this.tries}`, this.width/2, this.height - 40); 
    }

    drawResult(result){
        this.ctx.font = 'bold 24px sans-serif'; 
        this.ctx.fillStyle = result ? '#43CD51' : '#CD4343';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Игра окончена! Вы ${result ? 'выиграли' : 'проиграли'}!`, this.width/2, this.height - 70); 
    }

    getLetterFromUser(){
        let userLetter = prompt('Ваша буква:');

        if (this.word.indexOf(userLetter) == -1) this.figure.stage++;
        
        for (let i = 1; i < this.word.length - 1; i++){
            if (userLetter == this.word[i] && this.usedLetters[i] != userLetter) {
                this.answer[i] = userLetter;
                this.usedLetters[i] = userLetter;
                this.remain--;
            }
        }
        
        this.tries++;


        this.drawUsersInfo();
        this.drawWord();
        this.drawCanvasBorders();

        this.figure.drawStagePicture();

        this.check();

    }
    
    check(){
        if (this.tries > this.word.length - 2 || this.figure.stage > 6) {
            this.drawResult(0);
            setTimeout(this.play.bind(this), 3000);
        }
        else if (this.answer.join('') == this.word){
            this.drawResult(1);
            setTimeout(this.play.bind(this), 3000);
        }
    }
    
    play(){
        this.word = this.getRandomWord();
        this.answer = [];
        this.answer[0] = this.word[0];
        this.answer[this.word.length - 1] = this.word[this.word.length - 1];
        this.usedLetters[0] = this.word[0];
        this.usedLetters[this.word.length - 1] = this.word[this.word.length - 1];
        for (let i = 1; i < this.word.length - 1; i++) this.answer[i] = '_';
        this.remain = this.word.length - 2;
        this.tries = 0;

        this.drawUsersInfo();
        this.drawWord();
        this.drawCanvasBorders();
    }
}

let game = new Game(words, canvas);

game.play();

newGameBtn.addEventListener('click', game.play.bind(game));
guessBtn.addEventListener('click', game.getLetterFromUser.bind(game));