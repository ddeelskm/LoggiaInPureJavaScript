import checkNumInputs from './checkNumInputs'

const forms = (state) =>{
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input')

    checkNumInputs('input[name="user_phone"]')


    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    const postDate = async (url, data) =>{
        document.querySelector('status').textContent = message.loading
        let res = await fetch(url, {
            method: 'POSt',
            body: data
        })

        return await res.text()
    }

    const clearInputs = () =>{
        inputs.forEach(item =>{
          item.value = ''
        })
    }

    form.forEach(item =>{
        item.addEventListener('sumbit', (e) =>{
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.appendChild(statusMessage)

            const formDate = new FormData(item)
            if(item.getAttribute('data-calc') === 'end'){
                for(let key in state){
                    formDate.append(key, state[key])
                }
            }

            postDate('assets/server.php', formDate)
                .then(res =>{
                    statusMessage.textContent = message.success
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() =>{
                    clearInputs()
                    setTimeout(() =>{
                        statusMessage.remove()
                    }, 5000)
                })
        })
    })
}

export default forms