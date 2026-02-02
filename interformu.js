// JAVASCRIPT FÖR STUDENTKONTO

// 1. Hämta alla element från HTML som vi behöver jobba med
const form = document.getElementById('studentForm');
const programSelect = document.getElementById('program');
const welcomeNote = document.getElementById('welcomeNote');
const statusBox = document.getElementById('statusMessage');

/**
 * Funktion: Ändra välkomstmeddelandet dynamiskt
 * Körs varje gång användaren väljer ett nytt program i listan.
 */
programSelect.addEventListener('change', function () {
    let selected = programSelect.value;
    if (selected) {
        welcomeNote.innerText = "Välkommen till " + selected + "!";
    } else {
        welcomeNote.innerText = "Välkommen till universitetet!";
    }
});

/**
 * Funktion: Validera och hantera formuläret
 * Körs när användaren klickar på knappen "Skapa konto".
 */
form.addEventListener('submit', function (e) {
    // Förhindra att sidan laddas om (viktigt!)
    e.preventDefault();

    // Hämta de aktuella värdena från alla input-fält
    let firstName = document.getElementById('fname').value;
    let lastName = document.getElementById('lname').value;
    let age = parseInt(document.getElementById('age').value);
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pwd').value;
    let passConfirm = document.getElementById('pwd2').value;
    let termsAccepted = document.getElementById('terms').checked;
    let selectedProgram = programSelect.value;

    // Gör meddelande-boxen synlig
    statusBox.style.display = "block";

    // --- SÄKERHETSKONTROLLER (Validering) ---

    // Kontrollera om något fält är helt tomt
    if (firstName === "" || lastName === "" || email === "" || selectedProgram === "") {
        statusBox.innerText = "Vänligen fyll i alla personuppgifter.";
        statusBox.className = "err";
        return; // Avbryt så att kontot inte skapas
    }

    // Kontrollera ålderskravet (18-30 år)
    if (isNaN(age) || age < 18 || age > 30) {
        statusBox.innerText = "Du måste vara mellan 18 och 30 år för att ansöka.";
        statusBox.className = "err";
        return;
    }

    // Kontrollera lösenordets längd (minst 8 tecken)
    if (pass.length < 8) {
        statusBox.innerText = "Lösenordet måste vara minst 8 tecken långt.";
        statusBox.className = "err";
        return;
    }

    // Kontrollera att de två lösenorden är likadana
    if (pass !== passConfirm) {
        statusBox.innerText = "Lösenorden matchar inte varandra.";
        statusBox.className = "err";
        return;
    }

    // Kontrollera att villkoren är godkända
    if (!termsAccepted) {
        statusBox.innerText = "Du måste acceptera villkoren för att gå vidare.";
        statusBox.className = "err";
        return;
    }

    // --- OM ALLA KONTROLLER GÅR IGENOM ---
    statusBox.innerText = `Kontot är nu skapat för ${firstName} ${lastName}! En bekräftelse har skickats till ${email}.`;
    statusBox.className = "ok";

    // Rensa formuläret så det blir tomt igen
    form.reset();
    welcomeNote.innerText = "Välkommen till universitetet!";
});