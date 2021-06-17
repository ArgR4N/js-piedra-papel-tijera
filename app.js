const options = document.querySelectorAll(".option")
const player = document.querySelectorAll(".player")
const bot = document.querySelectorAll(".bot")

const resetBtn = document.querySelector(".winMsg")

const container = document.querySelectorAll(".mainContainer")
let i = 0
let playerSelect = 0
let botSelect = 0

const winMenssage = (msg,resetBtn) =>{
    resetBtn.innerHTML = msg
    resetBtn.removeAttribute("id")
}

function whoWins(player, bot){
    if (player == bot) {
        winMenssage("Empataste!", resetBtn)
        setTimeout(function(){restart(options, container, resetBtn)}, 3000)
    }
    if (player == 0 && bot == 2 || player == 1 && bot == 0 
        || player == 2 && bot == 1){
        winMenssage("Ganaste!", resetBtn)
        setTimeout(function(){restart(options, container, resetBtn)}, 3000)
    }
    if (bot == 0 && player == 2 || bot == 1 && player == 0 
        || bot == 2 && player == 1){
        winMenssage("Perdiste!", resetBtn)
        setTimeout(function(){restart(options, container, resetBtn)}, 3000)
    }
}

function restart(options, container, resetBtn){
    options.forEach(element=>{
        element.removeAttribute("id")
    })
    container[0].removeAttribute("id")
    container[1].setAttribute("id", "bot")
    resetBtn.setAttribute("id", "none")
    //botClick(player)
}

function tablePosition(n , isPlayer){
    if (isPlayer) {
        playerSelect = n
        if (n == 0) {
            container[0].setAttribute("id", "red")
        }
        if (n == 2) {
            container[0].setAttribute("id", "green")
        }
    }
    if (!isPlayer) {
        botSelect = n
        if (n == 0) {
            container[1].setAttribute("id", "red")
        }
        if (n == 1) {
            container[1].removeAttribute("id")
        }
        if (n == 2) {
            container[1].setAttribute("id", "green")
        }
        whoWins(playerSelect, botSelect)
    }
}

const tableAnalize = (botElement, playerElement)=>{
    let nPlayer = 0
    player.forEach(element => {
        if (element == playerElement) {
            tablePosition(nPlayer, true)
        }
        if (element != playerElement) {
            nPlayer++  
        }
    });
    let nBot = 0
    bot.forEach(element => {
        if (element == botElement) {
            tablePosition(nBot, false)
        }
        if (element != botElement) {
            nBot++  
        }
    });

}



const botClick  = (player) =>{
    choise = player[Math.floor(Math.random() * 3)]
    click(choise, true)
}

const click = (selected, isPlayer) =>{
    if (isPlayer) {
        let playerChoise = selected
        if (selected.id != "clicked") {
            selected.setAttribute("id", "clicked")
            player.forEach(option =>{
                if (option.id != "clicked") {
                    option.setAttribute("id", "none")
                }
            })
            let botChoise = bot[Math.floor(Math.random() * 3)]
            click(botChoise, false)
            tableAnalize(botChoise, playerChoise)
        }
    }
    if (!isPlayer) {
        selected.setAttribute("id", "clicked")
        bot.forEach(option =>{
            if (option.id != "clicked") {
                option.setAttribute("id", "none")
            }
        })
    }
}

player.forEach(element => {
    element.addEventListener("click", function(){botClick(player)})
});


/*
player.forEach(piringo => {
   piringo.addEventListener("click", function(){click(piringo, true)})
});
*/