let votes = loadVotes();
const voteOptions = document.querySelectorAll('.vote-option');
const radioButtons = document.querySelectorAll('input[name="ville"]');

voteOptions.forEach(option => {
    option.addEventListener('click', function () {
        voteOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});


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

    // pas 2 mm votes
    const hasVoted = votes.voters.some(voter =>
        voter.nom.toLowerCase() === nom.toLowerCase()
    );

    if (hasVoted) {
        alert('Vous avez déjà voté ! Un seul vote par personne.');
        return;
    }

    votes[ville]++;
    votes.voters.push({
        nom: nom,
        ville: ville,
        age: age,
        raison: raison,
        timestamp: new Date()
    });

    // mémoire persistante
    saveVotes();

    alert(`Merci ${nom} ! Votre vote pour ${ville === 'paris' ? 'Paris' : 'Marseille'} a été enregistré.`);
    updateResults();
    this.reset();
    voteOptions.forEach(opt => opt.classList.remove('selected'));
});

function updateResults() {
    const total = votes.paris + votes.marseille;
    const parisPercent = total > 0 ? Math.round((votes.paris / total) * 100) : 0;
    const marseillePercent = total > 0 ? Math.round((votes.marseille / total) * 100) : 0;

    // maj
    document.getElementById('parisVotes').textContent = votes.paris;
    document.getElementById('marseilleVotes').textContent = votes.marseille;
    document.getElementById('parisPercent').textContent = parisPercent;
    document.getElementById('marseillePercent').textContent = marseillePercent;
    document.getElementById('totalVotes').textContent = total;
    document.getElementById('parisBar').style.width = parisPercent + '%';
    document.getElementById('marseilleBar').style.width = marseillePercent + '%';
    const resultsSection = document.getElementById('results');
    resultsSection.classList.add('show');
}

// demo
function initDemo() {
    if (
        votes.paris === 0 &&
        votes.marseille === 0 &&
        votes.voters.length === 0
    ) {
        votes.paris = 0;
        votes.marseille = 0;
        votes.voters = [
            {
                nom: 'Demo Adrien',
                ville: 'paris',
                age: '18-25',
                raison: 'Pariissssss'
            },
            {
                nom: 'Demo Thomas',
                ville: 'marseille',
                age: '18-25',
                raison: 'Le soleil et la mer'
            }
        ];
        saveVotes();
    }
    updateResults();
}

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
    return {
        paris: 0,
        marseille: 0,
        voters: []
    };
}

initDemo();