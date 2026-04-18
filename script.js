// =======================
// PRODUCTS DATA
// =======================
const products = [
  {name:"AI Shoes", desc:"Smart shoes with sensors"},
  {name:"Smart Glasses", desc:"Augmented reality glasses"},
  {name:"Neural Headphones", desc:"Brainwave control audio"},
  {name:"Hologram Phone", desc:"3D projection phone"}
];

const container = document.getElementById("products");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

// =======================
// CREATE CARDS + 3D TILT
// =======================
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h3>${p.name}</h3>`;

  // 3D tilt effect
  div.addEventListener("mousemove", (e) => {
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 10;
    const rotateY = (x - rect.width / 2) / 10;

    div.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  div.addEventListener("mouseleave", () => {
    div.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });

  div.onclick = () => {
    modal.style.display = "flex";
    modalTitle.innerText = p.name;
    modalDesc.innerText = p.desc;
  };

  container.appendChild(div);
});

// =======================
// MODAL CLOSE
// =======================
document.getElementById("close").onclick = () => {
  modal.style.display = "none";
};

// =======================
// SCROLL REVEAL ANIMATION
// =======================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".card").forEach(card => {
  observer.observe(card);
});

// =======================
// CUSTOM CURSOR (REAL)
// =======================
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// =======================
// PARTICLE BACKGROUND
// =======================
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-1";

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx: Math.random()*1-0.5,
    vy: Math.random()*1-0.5
  });
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "cyan";

  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;

    if(p.x<0 || p.x>canvas.width) p.vx *= -1;
    if(p.y<0 || p.y>canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();



