class DeltagerManager {

    #regElm;
    #statElm;
    #finndeltagerElm;
    
    // Deklarer resterende felt-variabler her

    
    

    constructor(root) {
        this.registeredParticipants = [];
        this.#regElm = root.getElementsByClassName("registrering")[0];

        const regButton = this.#regElm.getElementsByTagName("button")[0];
        regButton.addEventListener("click", () => { this.#registrerdeltager() });

        this.#statElm = root.getElementsByClassName("statistikk")[0];
        const statButton = this.#statElm.getElementsByTagName("button")[0];
        statButton.addEventListener("click", () => { this.#beregnstatistikk() });

        this.#finndeltagerElm = root.getElementsByClassName("deltager")[0];
        const deltagerButton = this.#finndeltagerElm.getElementsByTagName("button")[0];
        deltagerButton.addEventListener("click", () => { this.#finndeltager() });
        
        
        // Fyll evt. inn mer kode
    }
 
    #finndeltager() {
        // Få tilgang til inputfeltet for deltagerens nummer
        const nummerInput = this.#finndeltagerElm.querySelector("input[type='number']");
    
        // Få tilgang til elementene for å vise resultatene
        const resultatDl = this.#finndeltagerElm.querySelector(".resultatok");
        const resultatMangler = this.#finndeltagerElm.querySelector(".resultatmangler");
    
        // Skjul tidligere resultater eller feilmeldinger
        resultatDl.style.display = "none";
        resultatMangler.style.display = "none";
    
        // Sjekk om input er gyldig i henhold til HTML-validity
        if (nummerInput.validity.valid) { 
            // Få deltagerens nummer fra inputfeltet
            const deltagerNummer = parseInt(nummerInput.value);
            
            // Søk etter deltageren med samme nummer i registeredParticipants-arrayen
            const deltager = this.registeredParticipants.find(participant => participant.number === deltagerNummer);
    
            if (deltager) {
                // Deltageren ble funnet, vis resultatene
                resultatDl.style.display = "block";
                resultatDl.querySelector("dd:first-child").textContent = deltager.number;
                resultatDl.querySelector("dd:nth-child(2)").textContent = deltager.name;
                resultatDl.querySelector("dd:nth-child(4)").textContent = deltager.time;
    
                // Vis deltagerinformasjonen i konsollen
                console.log("Deltager funnet:", deltager.number, deltager.name, deltager.time);
            } else {
                // Deltageren ble ikke funnet, vis melding "Ingen deltager funnet"
                resultatMangler.style.display = "block";
            }
        }

    }
    
    
    
    
    #beregnstatistikk() {
        // Fyll inn kode        
    }

    #registrerdeltager() {
        const tidReg = /\b\d{1,2}:\d{2}:\d{2}\b/; // Regex for time in HH:MM:SS format
        const nummerReg = /\b\d{1,3}\b/; // Regex for a number from 1 to 999
    
        // Get the input element
        const inputElement = this.#regElm.querySelector("input[type='text']");
    
        // Get the input value
        const inputValue = inputElement.value;
    
        // Initialize variables for name, time, and number
        let name = "";
        let tid = "";
        let nummer = "";
    
        // Check if there are at least two words (first name and last name)
        const words = inputValue.split(/\s+/).filter(Boolean); // Split and remove empty strings
        if (words.length < 2) {
            console.error("Invalid input. Please provide at least a first name and a last name.");
            inputElement.style.borderColor = "red"; // Highlight input box with red
            return; // Exit the function if the input is invalid
        } else {
            inputElement.style.borderColor = "green"; // Reset input box to green if it was previously marked as red
        }
    
        // Find and log the time
        const tidResultat = inputValue.match(tidReg);
    
        if (tidResultat) {
            tid = tidResultat[0];
            console.log(`Tidspunkt funnet: ${tid}`);
        } else {
            console.log("Ingen tidspunkt funnet.");
        }
    
        // Find and log the number from 1 to 999
        const nummerResultat = inputValue.match(nummerReg);
    
        if (nummerResultat) {
            nummer = nummerResultat[0];
            console.log(`Nummer funnet: ${nummer}`);
        } else {
            console.log("Ingen nummer funnet.");
        }
    
        // Remove the time and number from the input
        const inputWithoutTimeAndNumber = inputValue.replace(tidReg, "").replace(nummerReg, "").trim();
    
        // Check if there are at least two names (first name and last name)
        const names = inputWithoutTimeAndNumber.split(/\s+/).filter(Boolean);
        if (names.length < 2) {
            console.error("Invalid input. Please provide at least a first name and a last name.");
            inputElement.style.borderColor = "red"; // Highlight input box with red
            return; // Exit the function if the input is invalid
        } else {
            inputElement.style.borderColor = "green"; // Reset input box to green if it was previously marked as red
        }
    
        // Remove extra spaces and capitalize the first letter of each name and last name part
        name = names
            .map(name => {
                return name
                    .split('-') // Split by hyphens
                    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                    .join('-');
            })
            .join(" ");
    
        
    
        // Now you have separate variables for name, time, and number
        console.log("Name:", name, " Time:", tid, " Number:", nummer);

        const participantData = {
            number: nummer,
            name: name,
            time: tid,
        };

        // Add the participant's data to the registeredParticipants array
        this.registeredParticipants.push(participantData);

        // Print the registered participants array for testing purposes
        console.log("Registered Participants:", this.registeredParticipants);

        // Loop through the registeredParticipants array and log each participant's data
        for (let i = 0; i < this.registeredParticipants.length; i++) {
            const participant = this.registeredParticipants[i];
            console.log(`Participant ${i + 1}:` + " Number:", participant.number + " Name:", participant.name + " Time:", participant.time);
        }

        // Initialize variables to keep track of the lowest time and participant
        let lowestTime = null;
        let lowestTimeParticipant = null;

        // Loop through the registeredParticipants array and find the participant with the lowest time
        for (let i = 0; i < this.registeredParticipants.length; i++) {
            const participant = this.registeredParticipants[i];
            
            // Check if lowestTime is null or if the participant's time is lower than the current lowestTime
            if (lowestTime === null || participant.time < lowestTime) {
                lowestTime = participant.time;
                lowestTimeParticipant = participant;
            }
        }

        // Check if a participant with the lowest time was found
        if (lowestTimeParticipant) {
            console.log(`Laveste tid til nå: ${lowestTimeParticipant.time}`);
        
            // Update the content of the <span> element with the lowest time
            const lowestTimeSpan = document.getElementById("lowestTimeSpan");
            if (lowestTimeSpan) {
                lowestTimeSpan.textContent = lowestTimeParticipant.time;
        
                // Remove the "hidden" class to make the element visible
                const hiddenResultat = document.querySelector(".hidden.resultat");
                if (hiddenResultat) {
                    hiddenResultat.classList.remove("hidden");
                }
            }
        } else {
            console.log("Ingen deltakere registrert.");
        }



         

    }
}





const rootelement = document.getElementById("root");
new DeltagerManager(rootelement);