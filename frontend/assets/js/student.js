document.addEventListener("DOMContentLoaded", async () => {
    // Check if user is logged in by verifying phone and role in localStorage
    const phone = localStorage.getItem("userPhone");
    const role = localStorage.getItem("userRole");

    if (!phone || !role) {
        alert("User is not logged in.");
        window.location.href = "loginSignup.html";  // Redirect to login page if not logged in
        return;
    }

    let data;

    try {
        // Fetch student data if logged in
        const response = await fetch(`http://localhost:5000/students/${phone}`);

        if (!response.ok) {
            throw new Error('Failed to load student data');
        }

        data = await response.json();
        console.log("Student data fetched:", data);

        // Display student info inside editable fields
        const fields = ["name", "university", "location", "schedule", "attendance", "phone"];
        fields.forEach(field => {
            const spanElement = document.getElementById(`student-${field}`);
            spanElement.innerHTML = `<input type='text' id='edit-${field}' value='${data[field]}' disabled>`;
        });

        // Edit button functionality
        const editButton = document.getElementById("edit-btn");
        editButton.addEventListener("click", () => {
            fields.forEach(field => {
                document.getElementById(`edit-${field}`).disabled = false;
            });
            editButton.style.display = "none";
            saveButton.style.display = "inline-block";
            cancelButton.style.display = "inline-block";
        });

        // Save button functionality
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.style.display = "none";
        saveButton.addEventListener("click", async () => {
            const updatedData = {};
            fields.forEach(field => {
                updatedData[field] = document.getElementById(`edit-${field}`).value;
            });

            try {
                const updateResponse = await fetch(`http://localhost:5000/students/${phone}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData)
                });

                if (updateResponse.ok) {
                    alert('Student info updated successfully!');
                    editButton.style.display = "inline-block";
                    saveButton.style.display = "none";
                    cancelButton.style.display = "none";
                    fields.forEach(field => {
                        document.getElementById(`edit-${field}`).disabled = true;
                    });
                } else {
                    throw new Error('Failed to update student');
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to update student info");
            }
        });
        document.body.appendChild(saveButton);

        // Cancel button functionality
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.style.display = "none";
        cancelButton.addEventListener("click", () => {
            fields.forEach(field => {
                document.getElementById(`edit-${field}`).value = data[field];
                document.getElementById(`edit-${field}`).disabled = true;
            });
            editButton.style.display = "inline-block";
            saveButton.style.display = "none";
            cancelButton.style.display = "none";
        });
        document.body.appendChild(cancelButton);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to load student info");
    }
});
