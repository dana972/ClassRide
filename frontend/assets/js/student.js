const studentId = 1; // Replace with actual student ID from authentication

async function fetchStudentData() {
    try {
        const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error("Failed to fetch student data.");
        
        const student = await response.json();
        
        document.getElementById("studentName").innerText = student.name;
        document.getElementById("university").innerText = student.university;
        document.getElementById("location").innerText = student.location;
        document.getElementById("schedule").innerText = student.schedule;
        document.getElementById("attendance").innerText = student.attendance;
        document.getElementById("paymentStatus").innerText = student.payment_details.status;
    } catch (error) {
        console.error("Error fetching student data:", error);
        document.getElementById("error-message").innerText = "Failed to load student data.";
    }
}

window.onload = fetchStudentData;
