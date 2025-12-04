function animatePath(path, duration) {
    const total = path.getTotalLength();

    // Préparation du path pour l’animation
    path.style.strokeDasharray = total;
    path.style.strokeDashoffset = total;

    return new Promise(resolve => {
        path.animate(
            [
                { strokeDashoffset: total },
                { strokeDashoffset: 0 }
            ],
            {
                duration: duration,
                fill: "forwards",
                easing: "linear"
            }
        ).onfinish = resolve;
    });
}

function highlightNode(node) {
    node.classList.add("highlight");
    setTimeout(() => node.classList.remove("highlight"), 500);
}

async function start() {
    const path = document.getElementById("anim");

    const A = document.getElementById("A");
    const B = document.getElementById("B");
    const C = document.getElementById("C");
    const D = document.getElementById("D");

    // Remet le chemin invisible pour pouvoir réanimer
    path.style.strokeDashoffset = path.getTotalLength();

    // Mise en évidence initiale
    highlightNode(A);

    // Animation du chemin complet (avec virages)
    await animatePath(path, 2000);

    // Mise en évidence des nœuds dans l’ordre
    highlightNode(B);
    setTimeout(() => highlightNode(C), 300);
    setTimeout(() => highlightNode(D), 600);
}

// Bouton pour lancer l’animation à la demande
document.getElementById("startBtn").onclick = start;