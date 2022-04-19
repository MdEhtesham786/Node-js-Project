const slider = document.querySelector('.slider')
const sliderImages = document.querySelectorAll('.slider img')
const prevbutton = document.querySelectorAll('button')[1]
const nextbutton = document.querySelectorAll('button')[2]
const size = sliderImages[0].clientWidth;
const logout = document.querySelector('.logout')
const register = document.querySelector('.register')
const maindiv = document.querySelector('.main')
let counter = 1


if (window.innerWidth > 1500) {
    prevbutton.classList.remove('invisible')
    nextbutton.classList.remove('invisible')
    prevbutton.classList.add('prevbtn')
    nextbutton.classList.add('nextbtn')





} else {
    prevbutton.classList.add('invisible')
    nextbutton.classList.add('invisible')
    prevbutton.classList.remove('prevbtn')
    nextbutton.classList.remove('nextbtn')
    //Swipe logic
    // document.addEventListener('touchstart', (e) => {
    // console.log(e.targetTouches)
    // })
    // document.addEventListener('touchmove', (e) => {
    //     console.log('moving')
    // })
    // document.addEventListener('touchend', (e) => {
    //     console.log('end')
    // })
}
window.addEventListener('resize', () => {
    if (window.innerWidth > 1268) {
        prevbutton.classList.remove('invisible')
        nextbutton.classList.remove('invisible')
        prevbutton.classList.add('prevbtn')
        nextbutton.classList.add('nextbtn')



    } else {
        prevbutton.classList.add('invisible')
        nextbutton.classList.add('invisible')
        prevbutton.classList.remove('prevbtn')
        nextbutton.classList.remove('nextbtn')
        //Swipe logic
    }

})
console.log(window.innerWidth)









// Log out and Sign up confirmation
logout.addEventListener('click', () => {

    const logout_confirm = confirm('Do you want to Logout from this page?')
    if (logout_confirm) logout.setAttribute('href', '/')
    else logout.setAttribute('href', '#')
})
register.addEventListener('click', () => {
    const register_confirm = confirm('Wanna go to Sign up page?')
    if (register_confirm) register.setAttribute('href', 'register')
    else register.setAttribute('href', '#')
})

slider.style.transform = 'translateX(' + (-size * counter) + 'px)';

//
const prevbtn = document.querySelector('.prevbtn')
const nextbtn = document.querySelector('.nextbtn')

//Next button
nextbtn?.addEventListener('click', () => {
    if (counter >= 6) return;
    counter++
    slider.style.transition = 'transform 0.5s ease-in-out'
    slider.style.transform = 'translateX(' + (-size * counter) + 'px)';

    //Problem solved
    for (i = 0; i < 400; i++) {
        clearInterval(i)
    }
    setInterval(() => {
        counter++;
        slider.style.transition = 'transform 0.5s ease-in-out '
        //console.log(counter)
        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }, 3000)
})

//Prev button
prevbtn?.addEventListener('click', () => {
    if (counter <= 0) return;
    counter--
    slider.style.transition = 'transform 0.5s ease-in-out'
    slider.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // Problem solved
    for (i = 0; i < 400; i++) {
        clearInterval(i)
    }
    setInterval(() => {
        counter++;
        slider.style.transition = 'transform 0.5s ease-in-out '
        //console.log(counter)
        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }, 3000)
})
// Auto sliding
setInterval(() => {
    counter++;
    slider.style.transition = 'transform 0.5s ease-in-out '
    //console.log(counter)
    slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
}, 3000)


//Transitionend
slider.addEventListener('transitionend', () => {
    if (sliderImages[counter].id === 'lastclone') {
        slider.style.transition = 'none'
        counter = sliderImages.length - 2;
        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (sliderImages[counter].id === 'firstclone') {
        slider.style.transition = 'none'
        counter = sliderImages.length - counter;
        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
})
// //Stop on Mouseover
// slider.addEventListener('mouseover', () => {
//     for (i = 0; i < 400; i++) {
//         clearInterval(i)
//     }
// })

// // Resume on Mouseleave
// slider.addEventListener('mouseleave', () => {
//     setInterval(() => {
//         counter++;
//         slider.style.transition = 'transform 0.5s ease-in-out '
//         //console.log(counter)
//         slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
//     }, 3000)
// })

//Stop on minimize
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setInterval(() => {
            counter++;
            slider.style.transition = 'transform 0.5s ease-in-out '
            //console.log(counter)
            slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }, 3000)
    }
    else {
        for (i = 0; i < 400; i++) {
            clearInterval(i)
        }
    }
})
////////////////////////////////////////////////
//check the viewport width
