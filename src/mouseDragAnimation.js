const slider = document.querySelector(".slider")

let isDown = false;
let startX, startScroll;

export function sliderMouseDown() {
  slider.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX;                  // where the grab started
  startScroll = slider.scrollLeft;   // scroll position at grab time
  slider.style.cursor = 'grabbing';
});
}
sliderMouseDown()

window.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const walk = e.pageX - startX;        // how far the mouse moved
  slider.scrollLeft = startScroll - walk;  // scroll the opposite way
  // console.log("working")
});

window.addEventListener('mouseup', () => {
  isDown = false;
  slider.style.cursor = 'grab';
  // console.log("working")
});