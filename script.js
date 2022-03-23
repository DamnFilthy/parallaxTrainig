"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        // parallax mouse move
        const content = document.querySelector('.parallax__container'),
            clouds = document.querySelector('.images-parallax__clouds'),
            mountains = document.querySelector('.images-parallax__mountains'),
            human = document.querySelector('.images-parallax__human');

        // Кэф
        const forClouds = 40,
            forMountains = 20,
            forHuman = 10,
            speed = 0.05;

        let positionX = 0,
            positionY = 0,
            coordXprocent = 0,
            coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX += distX * speed;
            positionY += distY * speed;

            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`
            human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`

            requestAnimationFrame(setMouseParallaxStyle)
        }
        setMouseParallaxStyle();

        parallax.addEventListener("mousemove", function(event) {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = event.pageX - parallaxWidth / 2;
            const coordY = event.pageY - parallaxHeight / 2;


            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        })

        // parallax scroll
        let thresholdSets = [];

        for (let i = 0; i <= 1.0; i += 0.005) {
            thresholdSets.push(i)
        }
        const cellback = function(entries, observer) {
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemStyle(scrollTopProcent);
        }
        const observer = new IntersectionObserver(cellback, {
            threshold: thresholdSets
        })

        observer.observe(document.querySelector('.content'))

        function setParallaxItemStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`
            mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`
            human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%);`
        }
    }

});