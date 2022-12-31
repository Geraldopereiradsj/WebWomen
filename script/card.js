function renderFavJob(array) {
    const ulAside = document.querySelector('.aside__ul');
    ulAside.innerText = ''

    if (array.length <= 0) {
        const emptyJob = createEmptyCard()

        ulAside.appendChild(emptyJob)
    } else {

        ulAside.innerText = ''

        array.forEach(element => {
            const job = createJob(element)
            ulAside.appendChild(job)
        })


    }
    removeJobs()
}




function createEmptyCard() {
    const ul = document.querySelector('.aside__ul')


    const li = document.createElement('li')
    li.classList.add('aside__vazia-li')


    const h4 = document.createElement('h4')
    h4.classList.add('aside__tittle-vazio')
    h4.innerText = 'Você ainda não aplicou para nenhuma vaga'


    const div1 = document.createElement('div')
    div1.classList.add('aside_tarja-cinza-1')


    const div2 = document.createElement('div')
    div2.classList.add('aside_tarja-cinza-2')


    const divContainer = document.createElement('div')
    divContainer.classList.add('container__aside_cinza-1')


    const div3 = document.createElement('div')
    div3.classList.add('aside_tarja-cinza-3')

    const div4 = document.createElement('div')
    div4.classList.add('aside_tarja-cinza-4')


    const div5 = document.createElement('div')
    div5.classList.add('aside_tarja-cinza-5')

    ul.append(li, h4, div1, div2, divContainer, div3, div4, div5)
    divContainer.append(div3, div4, div5)

    return li
}



function createJob(array) {
    const li = document.createElement('li')
    li.classList.add('aside__li')


    const divButton = document.createElement('div')
    divButton.classList.add('container__aside--list')


    const p = document.createElement('p')
    p.classList.add('aside__paragraph-1')
    p.innerText = array.title;


    const button = document.createElement('button')
    button.classList.add('aside__button')
    button.dataset.id = array.id
    button.id = array.id


    const img = document.createElement('img')
    img.classList.add('aside__img')
    img.src = './assets/img/trash (1).png'

    const containerSmall = document.createElement('div')
    containerSmall.classList.add('container__aside--local')


    const smallOne = document.createElement('small')
    smallOne.classList.add('aside__small-1')
    smallOne.innerText = array.enterprise


    const smallTwo = document.createElement('small')
    smallTwo.classList.add('aside__small-2')
    smallTwo.innerText = array.location


    li.append(divButton, p, button, containerSmall, smallOne, smallTwo)
    divButton.append(p, button)
    button.appendChild(img)
    containerSmall.append(smallOne, smallTwo)

    return li
}



function removeJobs() {
    const removeBtns = document.querySelectorAll('.aside__button');
    const buttonMain = document.querySelectorAll('.main__button');
    const btns = [...buttonMain]
    const favJobs = JSON.parse(localStorage.getItem('@KenzieJob:favJobs')) || []
    removeBtns.forEach(button => {
        button.addEventListener('click', () => {
            const btn = btns.find(element => {
                return element.id == `button${button.id}`
            })
            btn.innerText = 'Candidatar'
            const jobsInCard = favJobs.filter(job => {
                return job.id != Number(button.dataset.id)
            })
            jobsFilter = jobsInCard
            localStorage.setItem('@KenzieJob:favJobs', JSON.stringify(jobsInCard))

            renderFavJob(jobsInCard)
        })
    })
}

