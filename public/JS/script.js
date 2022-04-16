const slider = document.querySelector('.slider')
const sliderImages = document.querySelectorAll('.slider img')
const prevbtn = document.getElementById('prevbtn')
const nextbtn = document.getElementById('nextbtn')
const size = sliderImages[0].clientWidth;
const logout = document.querySelector('.logout')
const register = document.querySelector('.register')
let counter = 1
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

// Auto sliding
setInterval(() => {
    counter++;
    slider.style.transition = 'transform 0.5s ease-in-out '
    //console.log(counter)
    slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
}, 3000)

//Next button
nextbtn.addEventListener('click', () => {
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
prevbtn.addEventListener('click', () => {
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
//Stop on Mouseover
// slider.addEventListener('mouseover', () => {
//     for (i = 0; i < 400; i++) {
//         clearInterval(i)
//     }
// })

//Resume on Mouseleave
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