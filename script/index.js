function renderCards(cards) {
    const ulMain = document.querySelector('.main__ul');

    cards.forEach(card => {
        const cardMain = createCard(card)
        ulMain.appendChild(cardMain)
    })

    localStorage.setItem('@KenzieJob:renderMain', JSON.stringify(cards))

    const favJobs = JSON.parse(localStorage.getItem("@KenzieJob:favJobs")) || []
    renderFavJob(favJobs)

}




function createCard(card) {
    const li = document.createElement('li')
    li.classList.add('main__li')


    const h3 = document.createElement('h3')
    h3.classList.add('main__tittle-2')
    h3.innerText = card.title


    const divSmall = document.createElement('div')
    divSmall.classList.add('container__small')


    const smallOne = document.createElement('small')
    smallOne.classList.add('main__small-1')
    smallOne.innerText = card.enterprise


    const smallTwo = document.createElement('small')
    smallTwo.classList.add('main__small-2')
    smallTwo.innerText = card.location


    const p = document.createElement('p')
    p.classList.add('main__paragraph')
    p.innerText = card.descrition


    const containerButton = document.createElement('div')
    containerButton.classList.add('container__main--button')



    const spanOne = document.createElement('span')
    spanOne.classList.add('main__local')
    spanOne.innerText = card.modalities[0]


    const spanTwo = document.createElement('span')
    spanTwo.classList.add('main__local')
    spanTwo.innerText = card.modalities[1]

    const button = document.createElement('button')
    button.classList.add('main__button')
    button.dataset.id = card.id
    button.id = `button${card.id}`
    const found = removeButtons(card.id);
    if (found == undefined) {
        button.innerText = 'Candidatar'
    } else {
        button.innerText = 'Remover Candidatura'
    }




    button.addEventListener("click", (event) => {
        if (button.innerText == 'Candidatar') {
            jobsFilter.push(card)
            localStorage.setItem('@KenzieJob:favJobs', JSON.stringify(jobsFilter))

            button.innerText = 'Remover Candidatura'
        } else {
            button.innerText = 'Candidatar'
            jobsFilter = jobsFilter.filter (element => element.id !== card.id)
            localStorage.setItem('@KenzieJob:favJobs', JSON.stringify(jobsFilter))
            
        }
        renderFavJob(jobsFilter)
    });


    li.append(h3, divSmall, smallOne, smallTwo, p, containerButton, spanOne, spanTwo, button);
    divSmall.append(smallOne, smallTwo);
    containerButton.append(spanOne, spanTwo, button);


    return li
}


function removeButtons(job) {
    const favJobs = JSON.parse(localStorage.getItem('@KenzieJob:favJobs')) || []
    if (favJobs.length == 0) {
        return undefined
    }
    const found = favJobs.find(element => element.id == job)

    return found

}


renderCards(jobsData)
