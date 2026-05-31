import { needleArm, needleArmPlay, needleArmPause, vinylBaseRotation, vinylRotation, vinylRotationStart, vinylRotationStop, vinylBaseRotationStart, vinylBaseRotationStop } from "../script"
import { gsap } from "gsap"

const playButton = document.querySelector("#playButton")
const backwardButton = document.querySelector("#backwardButton")
const forwardButton = document.querySelector("#forwardButton")

const audio = document.querySelector("#audio")

let trackLength = 0
let elapsed = 0

let tracks = []
let trackNumber = 0

fetch("/musicPlayer/tracks.json")
.then(response => response.json())
.then(data => {
    tracks = data
})
.catch(error => {
    console.error('Could not load JSON:', error);
});

let trackTitle = document.querySelector("#title")
let trackArtist = document.querySelector("#artist")
let trackSrc

let firstPlay = false
let firstPlayConcluded = false

function initialAudioPlay() {
    if (firstPlay == false) {
        document.querySelector("#playButtonImage").src = "/images/pause.svg"
        needleArmPlay.play()
        vinylRotationStart()
        vinylBaseRotationStart()
        firstPlay = true
        setTimeout(() => { 
            audio.play()
        }, 3000)  
    } else {null}
}

function startStopLogic() {
    audio.paused ? audio.play() : audio.pause()
    audio.paused ? document.querySelector("#playButtonImage").src = "/images/playIcon.svg" : document.querySelector("#playButtonImage").src = "/images/pause.svg"
    audio.paused ? vinylRotationStop() : vinylRotationStart()
    audio.paused ? vinylBaseRotationStop() : vinylBaseRotationStart()
    needleArmPause()
}

playButton.addEventListener("click", () => {
    firstPlay == true ? startStopLogic() : initialAudioPlay()
})

forwardButton.addEventListener("click", () => {
    audio.pause()
    trackNumber++
    trackTitle.textContent = tracks[trackNumber].title
    trackArtist.textContent = tracks[trackNumber].artist
    audio.src = tracks[trackNumber].src
    audio.play()
})

backwardButton.addEventListener("click", () => {
    audio.pause()
    trackNumber--
    trackTitle.textContent = tracks[trackNumber].title
    trackArtist.textContent = tracks[trackNumber].artist
    audio.src = tracks[trackNumber].src
    audio.play()
})


