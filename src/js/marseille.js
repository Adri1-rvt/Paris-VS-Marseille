document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner les éléments par leurs classes
    const velodrome1 = document.querySelector('.Velodrome-1');
    const velodrome2 = document.querySelector('.Velodrome-2');
    const musique = document.getElementById('musique');

    // Vérifier si l'élément audio est bien récupéré
    if (!musique) {
        console.log("Élément audio non trouvé");
    }

    // Ajouter un événement pour jouer la musique lorsque la souris survole les divs spécifiées
    velodrome1.addEventListener('mouseover', () => {
        musique.play().catch(err => console.log("Erreur lors de la lecture de la musique : " + err));
    });

    velodrome2.addEventListener('mouseover', () => {
        musique.play().catch(err => console.log("Erreur lors de la lecture de la musique : " + err));
    });

    // Ajouter un événement pour arrêter la musique lorsque la souris quitte les divs
    velodrome1.addEventListener('mouseout', () => {
        musique.pause();
        musique.currentTime = 0; // Revenir au début de la musique
    });

    velodrome2.addEventListener('mouseout', () => {
        musique.pause();
        musique.currentTime = 0; // Revenir au début de la musique
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".floating-box");
    const wrapper = document.querySelector(".floating-wrapper");

    // Fonction pour animer chaque boîte vers une position aléatoire
    function moveBox(box) {
        const maxX = wrapper.offsetWidth - box.offsetWidth;
        const maxY = wrapper.offsetHeight - box.offsetHeight;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        // On utilise transform pour profiter de la transition CSS
        box.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    // Déplacement initial de toutes les boîtes
    boxes.forEach((box) => {
        moveBox(box);
        // Redéplacement périodique (ici toutes les 3 secondes)
        setInterval(() => moveBox(box), 3000);
    });

    // Pas de texte au clic : on ignore les clics
    // (empêche juste le clic de faire quoi que ce soit)
    boxes.forEach((box) => {
        box.addEventListener("click", (e) => {
            e.preventDefault();
            // Aucune action sur clic
        });
    });
});