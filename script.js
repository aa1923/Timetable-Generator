document.getElementById('numSubjects').addEventListener('input', function() {
    const numSubjects = this.value;
    const subjectInputsDiv = document.getElementById('subjectInputs');
    subjectInputsDiv.innerHTML = ''; // Clear previous inputs

    for (let i = 0; i < numSubjects; i++) {
        const subjectInput = document.createElement('div');
        subjectInput.innerHTML = `
            <label for="subject${i}">Subject ${i + 1}:</label>
            <input type="text" id="subject${i}" required>
            <label for="hours${i}">Hours for Subject ${i + 1}:</label>
            <input type="number" id="hours${i}" min="1" required>
        `;
        subjectInputsDiv.appendChild(subjectInput);
    }
});

function generateTimetable() {
    const numSubjects = document.getElementById('numSubjects').value;
    const classesAvailable = document.getElementById('classesAvailable').value.split(',');
    const slotsAvailable = document.getElementById('slotsAvailable').value.split(',');
    const teachersAvailable = document.getElementById('teachersAvailable').value.split(',');

    const timetable = [];
    for (let i = 0; i < classesAvailable.length; i++) {
        timetable[i] = {
            class: classesAvailable[i].trim(),
            schedule: Array(slotsAvailable.length).fill('Free Slot')
        };
    }

    for (let j = 0; j < numSubjects; j++) {
        const subject = document.getElementById(`subject${j}`).value;
        const hours = document.getElementById(`hours${j}`).value;
        
        for (let k = 0; k < hours; k++) {
            const classIndex = Math.floor(Math.random() * classesAvailable.length);
            const slotIndex = Math.floor(Math.random() * slotsAvailable.length);
            timetable[classIndex].schedule[slotIndex] = subject;
        }
    }

    displayTimetable(timetable, slotsAvailable);
}

function displayTimetable(timetable, slotsAvailable) {
    const outputDiv = document.getElementById('timetableOutput');
    outputDiv.innerHTML = ''; // Clear previous output

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    headerRow.insertCell().outerHTML = '<th>Time</th>';
    slotsAvailable.forEach(slot => {
        headerRow.insertCell().outerHTML = `<th>${slot}</th>`;
    });

    timetable.forEach(entry => {
        const row = table.insertRow();
        row.insertCell().outerHTML = `<td class="time-slot">${entry.class}</td>`;
        entry.schedule.forEach(slot => {
            row.insertCell().outerHTML = `<td class="${slot === 'Free Slot' ? 'subject' : 'subject-occupied'}">${slot}</td>`;
        });
    });

    outputDiv.appendChild(table);
}
