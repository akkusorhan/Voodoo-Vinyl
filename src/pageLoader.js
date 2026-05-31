const homePageButton = document.querySelector(".logo")
const aboutPageButton = document.querySelector("#aboutButton")
const contactPageButton = document.querySelector("#contactButton")

const homePage = document.querySelector("#hero")
const aboutPage = document.querySelector("#aboutPage")
const contactPage = document.querySelector(".contactPage")

homePageButton.addEventListener("click", () => {
    homePage.style.display = ""
    aboutPage.style.display = "none"
    contactPage.style.display = "none"

    window.history.pushState( { data: null }, "Voodoo Vinyl Records | Record Store in Lancaster, CA", "/home" )
})
aboutPageButton.addEventListener("click", () => {
    homePage.style.display = "none"
    aboutPage.style.display = ""
    contactPage.style.display = "none"

    window.history.pushState( { data: null }, "About Us | Voodoo Vinyl Records — Lancaster, CA", "/about" )
})
contactPageButton.addEventListener("click", () => {
    homePage.style.display = "none"
    aboutPage.style.display = "none"
    contactPage.style.display = ""

    window.history.pushState( { data: null }, "Contact | Voodoo Vinyl Records — Lancaster, CA", "/contact" )
})