setInterval(snowEffect, 200)

function snowEffect () {
    const snow = document.createElement('i');
    snow.classList.add('fa-solid');
    snow.classList.add('fa-snowflake');
    snow.style.left = Math.random() * innerWidth + 'px';
    snow.style.opacity = Math.random();
    snow.style.fontSize = Math.random() * 25 + 'px';
    snow.style.animationDuration = Math.random() * 2 +2 + 's';
    snow.style.left = Math.random() * innerWidth + 'px';
    document.body.append(snow);

    setTimeout(() =>{
        snow.remove(1)
    }, 400000)
}