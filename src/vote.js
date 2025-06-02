// Données des votes (stockées en mémoire persistante)
let votes = loadVotes();

// Sélection des options de vote
const voteOptions = document.querySelectorAll('.vote-option');
const radioButtons = document.querySelectorAll('input[name="ville"]');

// Gestion de la sélection visuelle
voteOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Retirer la classe selected de toutes les options
        voteOptions.forEach(opt => opt.classList.remove('selected'));
        // Ajouter la classe selected à l'option cliquée
        this.classList.add('selected');
    });
});

// Gestion du formulaire
document.getElementById('voteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const ville = formData.get('ville');
    const nom = formData.get('nom');
    const age = formData.get('age');
    const raison = formData.get('raison');

    if (!ville) {
        alert('Veuillez sélectionner une ville !');
        return;
    }

    // Vérifier si la personne a déjà voté
    const hasVoted = votes.voters.some(voter =>
        voter.nom.toLowerCase() === nom.toLowerCase()
    );

    if (hasVoted) {
        alert('Vous avez déjà voté ! Un seul vote par personne.');
        return;
    }

    // Enregistrer le vote
    votes[ville]++;
    votes.voters.push({
        nom: nom,
        ville: ville,
        age: age,
        raison: raison,
        timestamp: new Date()
    });

    // Sauvegarder en mémoire persistante
    saveVotes();

    // Afficher un message de confirmation
    alert(`Merci ${nom} ! Votre vote pour ${ville === 'paris' ? 'Paris' : 'Marseille'} a été enregistré.`);

    // Mettre à jour l'affichage des résultats
    updateResults();

    // Réinitialiser le formulaire
    this.reset();
    voteOptions.forEach(opt => opt.classList.remove('selected'));
});

function updateResults() {
    const total = votes.paris + votes.marseille;
    const parisPercent = total > 0 ? Math.round((votes.paris / total) * 100) : 0;
    const marseillePercent = total > 0 ? Math.round((votes.marseille / total) * 100) : 0;

    // Mettre à jour les textes
    document.getElementById('parisVotes').textContent = votes.paris;
    document.getElementById('marseilleVotes').textContent = votes.marseille;
    document.getElementById('parisPercent').textContent = parisPercent;
    document.getElementById('marseillePercent').textContent = marseillePercent;
    document.getElementById('totalVotes').textContent = total;

    // Mettre à jour les barres de progression
    document.getElementById('parisBar').style.width = parisPercent + '%';
    document.getElementById('marseilleBar').style.width = marseillePercent + '%';

    // Afficher la section des résultats
    const resultsSection = document.getElementById('results');
    resultsSection.classList.add('show');
}

// Initialiser quelques votes de démonstration
function initDemo() {
    // Ne pas écraser les données existantes
    if (
        votes.paris === 0 &&
        votes.marseille === 0 &&
        votes.voters.length === 0
    ) {
        votes.paris = 0;
        votes.marseille = 0;
        votes.voters = [
            {
                nom: 'Demo User 1',
                ville: 'paris',
                age: '25-35',
                raison: 'Culture incroyable'
            },
            {
                nom: 'Demo User 2',
                ville: 'marseille',
                age: '18-25',
                raison: 'Le soleil et la mer'
            }
        ];
        saveVotes();
    }
    updateResults();
}

// Fonctions de sauvegarde/chargement
function saveVotes() {
    try {
        const votesJson = JSON.stringify(votes);
        localStorage.setItem('votesData', votesJson);
    } catch (e) {
        console.error('Erreur lors de la sauvegarde des votes dans localStorage :', e);
    }
}

function loadVotes() {
    try {
        const stored = localStorage.getItem('votesData');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Erreur lors du chargement des votes depuis localStorage :', e);
    }

    // Valeurs par défaut si rien dans localStorage
    return {
        paris: 0,
        marseille: 0,
        voters: []
    };
}

// Lancer la démo au chargement
initDemo();