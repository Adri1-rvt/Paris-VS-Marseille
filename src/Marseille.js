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
