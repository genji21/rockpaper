const itemButton = document.querySelectorAll(".game_icon_i");
const displayResult = document.querySelector('.game_display');
const userButton = document.querySelector('.user');
const randomButton = document.querySelector('.random');
const playButton = document.querySelector('.result_play_again');
const arrayItem = Array.from(itemButton);
const boxGame = document.querySelector('.game_detail_img-pentagion');
const boxResult = document.querySelector('.result_wrap');
const vid = document.getElementById("myVideo");
const buttronRule = document.querySelector('.rule');
const  modal = document.getElementById("myModal");
let result = arrayItem.map((item)=>{
    return {
        background: getComputedStyle(item).getPropertyValue('background-Image'),
        boxShadow : getComputedStyle(item).getPropertyValue('box-Shadow'),
        image:item.querySelector('img').src,
        type : item.getAttribute('data-game-type')
    }
})
itemButton.forEach((item)=>{
item.addEventListener('click',function(){
this.parentElement.style.display ="none"
displayResult.style.display ="flex"
// 
let background = getComputedStyle(this).getPropertyValue('background-Image');
let boxShadow =getComputedStyle(this).getPropertyValue('box-Shadow');
let data = item.getAttribute('data-game-type')
// 
userButton.style.cssText = `background:${background};boxshadow:${boxShadow}`
userButton.querySelector('img').src = `${this.querySelector('img').src}`
userButton.setAttribute('data-game-type',data)
displayRandom(result,userButton)
})
})

function displayRandom(objcetCss,valueUser){
  let intervalId = setInterval(function(){
    randomButton.querySelector('img').style.visibility="unset"
    let numberRandom = Math.floor(Math.random() * arrayItem.length)
        randomButton.style.cssText = `background:${objcetCss[numberRandom].background};boxshadow:${objcetCss[numberRandom].boxShadow}`
        randomButton.querySelector('img').src = `${objcetCss[numberRandom].image}`
        randomButton.setAttribute('data-game-type',objcetCss[numberRandom].type)
    },200)
 let idTimeout= setTimeout(function() {
      compare(valueUser,randomButton);
      clearInterval(intervalId)
  },2000)
}
function compare(user,random){
    let userType = user.getAttribute('data-game-type');
    let typeRandom = random.getAttribute('data-game-type') ;
    if(userType === typeRandom) {
        let flag = 'draw'
        displayResultText(flag)
        return ;
    }
    if(userType === 'rock') {
        if(typeRandom === 'scissors' || typeRandom === 'lizard') {
           let flag = 'win' ;
           let winner = user
            displayResultText(flag,winner)
        } 
        else {
            let flag = 'lose' 
            let winner = random
            displayResultText(flag,winner)
        }
    }
    if(userType === 'paper') {
        if(typeRandom === 'rock'|| typeRandom === 'spock') {
            let flag = 'win' ;
            let winner = user
             displayResultText(flag,winner)
        }
        else{
            let flag = 'lose' 
            let winner = random
            displayResultText(flag,winner)
        }
    }
    if(userType === 'scissors'){
        if(typeRandom ==='paper' || typeRandom === 'lizard') {
            let flag = 'win' ;
           let winner = user
            displayResultText(flag,winner)
        }
        else{
            let flag = 'lose' 
            let winner = random
            displayResultText(flag,winner)
        }
    }
    if(userType === 'lizard'){
        if(typeRandom === 'spock' || typeRandom === 'paper'){
            let flag = 'win' ;
           let winner = user
            displayResultText(flag,winner)
        }
        else {
            let flag = 'lose' 
            let winner = random
            displayResultText(flag,winner)
        }
    }
    if(userType === 'spock'){
        if(typeRandom === 'scissors' || typeRandom === 'rock') {
            let flag = 'win' ;
            let winner = user
             displayResultText(flag,winner)
        }
        else{
            let flag = 'lose' 
            let winner = random
            displayResultText(flag,winner)
        }
    }
   
}

function displayResultText(flag,winner){
let score= document.querySelector('.score');
let resultText= document.querySelector('.result_title')
    boxResult.style.display = 'flex'
    if(flag === 'win'){
        score.innerHTML = Number(score.textContent) +1
        resultText.innerHTML =" YOU WIN "
        vid.getElementsByTagName('source')[0].src = './audio/win2.wav'
        vid.load();
    winner.classList.add('winner')
    vid.play();
    }
    else if(flag ==='lose') {
    score.innerHTML = Number(score.textContent) - 1
    resultText.innerHTML =" YOU LOSE "
    vid.getElementsByTagName('source')[0].src = './audio/lose.wav'
    vid.load();
    vid.play();
    console.log(vid);
    winner.classList.add('winner')

    }

    else {
        resultText.innerHTML =" YOU Draw "
    }
    console.log(winner);

}




buttronRule.addEventListener('click',function(){
    modal.style.display = "flex";
})

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
playButton.addEventListener('click',function(){
    
    boxGame.style.display="block";
    displayResult.style.display="none"
    boxResult.style.display='none'
    document.querySelector('.winner')?  document.querySelector('.winner').classList.remove('winner') : ""
})