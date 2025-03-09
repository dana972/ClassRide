document.addEventListener("DOMContentLoaded", async () => {
    // Check if user is logged in by verifying phone and role in localStorage
    const phone = localStorage.getItem("userPhone"); // Use 'userPhone' to match your login storage key
    const role = localStorage.getItem("userRole");

    if (!phone || !role) {
        alert("User is not logged in.");
        window.location.href = "loginSignup.html";  // Redirect to login page if not logged in
        return;
    }

    try {
        // Fetch student data if logged in
        const response = await fetch(`http://localhost:5000/students/${phone}`);

        if (!response.ok) {
            throw new Error('Failed to load student data');
        }

        const data = await response.json();
        console.log("Student data fetched:", data); // Debugging

        // Display student info
        document.getElementById("student-name").innerText = data.name;
        document.getElementById("student-university").innerText = data.university;
        document.getElementById("student-location").innerText = data.location;
        document.getElementById("student-schedule").innerText = data.schedule;
        document.getElementById("student-attendance").innerText = data.attendance;
        document.getElementById("student-phone").innerText = data.phone;

        // Edit button functionality
        const editButton = document.getElementById("edit-btn");
        const editForm = document.getElementById("edit-form");
        const cancelButton = document.getElementById("cancel-edit");

        // Show the form when "Edit" is clicked
        editButton.addEventListener("click", () => {
            document.getElementById("edit-name").value = data.name;
            document.getElementById("edit-university").value = data.university;
            document.getElementById("edit-location").value = data.location;
            document.getElementById("edit-schedule").value = data.schedule;
            document.getElementById("edit-attendance").value = data.attendance;
            editForm.style.display = "block";
        });

        // Hide the form if "Cancel" is clicked
        cancelButton.addEventListener("click", () => {
            editForm.style.display = "none";
        });

        // Handle form submission to update student
        const editStudentForm = document.getElementById("edit-student-form");

        editStudentForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const updatedData = {
                name: document.getElementById("edit-name").value,
                university: document.getElementById("edit-university").value,
                location: document.getElementById("edit-location").value,
                schedule: document.getElementById("edit-schedule").value,
                attendance: document.getElementById("edit-attendance").value
            };

            try {
                const updateResponse = await fetch(`http://localhost:5000/students/${phone}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache' // Avoid caching
                    },
                    body: JSON.stringify(updatedData)
                });

                if (updateResponse.ok) {
                    const updatedStudent = await updateResponse.json();
                    console.log("Updated student data:", updatedStudent); // Debugging

                    alert('Student info updated successfully!');

                    // Re-fetch the data to ensure it's up-to-date
                    const refreshedResponse = await fetch(`http://localhost:5000/students/${phone}`);
                    const refreshedData = await refreshedResponse.json();
                    console.log("Refreshed student data:", refreshedData); // Debugging

                    // Dynamically update the displayed student info on the page
                    document.getElementById("student-name").innerText = refreshedData.name;
                    document.getElementById("student-university").innerText = refreshedData.university;
                    document.getElementById("student-location").innerText = refreshedData.location;
                    document.getElementById("student-schedule").innerText = refreshedData.schedule;
                    document.getElementById("student-attendance").innerText = refreshedData.attendance;

                    // Optionally, you can also update the form fields as well (if desired)
                    document.getElementById("edit-name").value = refreshedData.name;
                    document.getElementById("edit-university").value = refreshedData.university;
                    document.getElementById("edit-location").value = refreshedData.location;
                    document.getElementById("edit-schedule").value = refreshedData.schedule;
                    document.getElementById("edit-attendance").value = refreshedData.attendance;

                    // Hide the edit form
                    editForm.style.display = "none";

                    // Store the updated data back to localStorage if needed
                    localStorage.setItem("userPhone", updatedStudent.phone); // Update phone in localStorage if necessary
                    localStorage.setItem("userRole", updatedStudent.role); // Update role if necessary
                } else {
                    throw new Error('Failed to update student');
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to update student info");
            }
        });

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to load student info");
    }
});
