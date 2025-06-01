//galeria
const images = [
      {src: "Photos/galeria1.jpg" , title: "God of War: Ragnarök"},
      {src: "Photos/galeria2.jpg" , title: "Forza Horizon 5"},
      {src: "Photos/galeria3.webp" , title: "Cyberpunk 2077"},
      {src: "Photos/galeria4.png" , title: "Red Dead Redemption 2"},
      
      {src: "Photos/galeria7.jpeg" , title: "The Last of Us Part 2"},
      {src: "Photos/galeria8.jpg" , title: "Bodycam"},
      {src: "Photos/galeria9a.webp" , title: "Assassin's Creed: Shadows"},
      {src: "Photos/galeria10.jpg" , title: "Ghost of Tsushima"},
      {src: "Photos/galeria11.webp" , title: "Black Myth: Wukong"}
  ]; 
  let current = 0;

const imgElement = document.getElementById("gallery-image");
const titleElement = document.getElementById("game-title");

function updateImage() {
  imgElement.src = images[current].src;
  titleElement.textContent = images[current].title;
}

function showFirst() {
  current = 0;
  updateImage();
}

function showLast() {
  current = images.length - 1;
  updateImage();
}

function showNext() {
  current = (current + 1) % images.length;
  updateImage();
}

function showPrevious() {
  current = (current - 1 + images.length) % images.length;
  updateImage();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrevious();
});


updateImage();