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
            subjects: [],
        };
        for (let j = 0; j < numSubjects; j++) {
            const subject = document.getElementById(`subject${j}`).value;
            const hours = document.getElementById(`hours${j}`).value;
            timetable[i].subjects.push({ name: subject, hours: hours });
        }
    }

    displayTimetable(timetable);
}

function displayTimetable(timetable) {
    const outputDiv = document.getElementById('timetableOutput');
    outputDiv.innerHTML = ''; // Clear previous output

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    headerRow.insertCell().outerHTML = '<th>Class</th>';
    timetable[0].subjects.forEach((subject, index) => {
        headerRow.insertCell().outerHTML = `<th>${subject.name}</th>`;
    });

    timetable.forEach(entry => {
        const row = table.insertRow();
        row.insertCell().innerText = entry.class;
        entry.subjects.forEach(subject => {
            row.insertCell().innerText = subject.hours;
        });
    });

    outputDiv.appendChild(table);
}
