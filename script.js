window.addEventListener("scroll", function () {
  const element = document.querySelector(".iles-container");
  const rect = element.getBoundingClientRect();
  // ajout d'un délai pour déclencher l'animation un peu avant que l'élément soit complètement visible
  // Quand le haut du bloc entre dans la fenêtre

  
  if (rect.top < window.innerHeight - 100) {
    element.classList.add("visible");

  }
});
