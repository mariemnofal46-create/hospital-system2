let patients = [];

function addPatient() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let disease = document.getElementById("disease").value;

    if (name === "" || age === "" || phone === "" || disease === "") {
        alert("Please enter all data");
        return;
    }

    patients.push({ name, age, phone, disease });

    saveData();
    clearInputs();
    displayPatients();
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("disease").value = "";
}

function deletePatient(index) {
    patients.splice(index, 1);
    saveData();
    displayPatients();
}

function displayPatients(list = patients) {
    let container = document.getElementById("list");
    container.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        container.innerHTML += `
        <div class="card">
            <h3> ${list[i].name}</h3>
            <p> Age: ${list[i].age}</p>
            <p> Phone: ${list[i].phone}</p>
            <p> Disease: ${list[i].disease}</p>
            <button onclick="deletePatient(${i})">Delete</button>
        </div>
        `;
    }
}

function searchPatient() {
    let value = document.getElementById("search").value.toLowerCase();

    let filtered = patients.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    displayPatients(filtered);
}

//  Save data in browser
function saveData() {
    localStorage.setItem("patients", JSON.stringify(patients));
}

//  Load data when page opens
function loadData() {
    let data = localStorage.getItem("patients");

    if (data) {
        patients = JSON.parse(data);
        displayPatients();
    }
}

loadData();