// Fetch driver dashboard data
document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch('http://localhost:5000/driver/dashboard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Display assigned bus
        document.getElementById('bus-name').textContent = data.bus.name || "No bus assigned"; // Bus name
  
        // Display list of students
        const studentsList = document.getElementById('students-list');
        if (data.students.length > 0) {
          data.students.forEach(student => {
            const li = document.createElement('li');
            li.textContent = `${student.name} - ${student.pickUpLocation}`; // Display student's name and pick-up location
            studentsList.appendChild(li);
          });
        } else {
          studentsList.innerHTML = "<li>No students to pick up</li>"; // Message if no students
        }
      } else {
        alert('Failed to fetch driver dashboard data');
      }
    } catch (error) {
      console.error('Error fetching driver dashboard data:', error);
    }
  });
  