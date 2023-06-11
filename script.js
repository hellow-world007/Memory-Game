// <<<<<===start===>>>>>

const memoryCards=document.querySelectorAll('.memory-card')
memoryCards.forEach(function(memoryCard){
    memoryCard.addEventListener('click',flipcard)
})

let hasFlippedCard=false
let lockBoard=false
let firstCard,secondCard;
let matchedCard=0;

function flipcard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip')

    if(!hasFlippedCard){
        hasFlippedCard=true
        firstCard=this
    }else{
        secondCard=this

        //console.log('flipped')
        if(firstCard.dataset.id===secondCard.dataset.id){
            matchedCard++
            if(matchedCard == 6){
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
            firstCard.addEventListener('click',flipcard)
            secondCard.addEventListener('click',flipcard)
            resetBoard()
        }else{
            lockBoard=true

            setTimeout(() => {
                firstCard.classList.add('shake')
                secondCard.classList.add('shake')
                //resetBoard()
                [firstCard,secondCard]=[null,null]
            }, 500);

            setTimeout(() => {
                firstCard.classList.remove('shake','flip')
                secondCard.classList.remove('shake','flip')
                /*firstCard.classList.remove('flip')
                secondCard.classList.remove('flip')*/
                resetBoard()
            }, 1500);
        }
        //console.log({firstCard.dataset.framework,secondCard.dataset.framework)

    }

}

function resetBoard(){
    [hasFlippedCard,lockBoard]=[false,false]
    [firstCard,secondCard]=[null,null]
}

(function suffle(){
    memoryCards.forEach(function(memoryCard){
        let randomNumber=Math.floor(Math.random()*12)
        memoryCard.style.order=randomNumber;
    })
})()


