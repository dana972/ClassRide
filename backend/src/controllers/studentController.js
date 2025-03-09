const db = require('../config/db'); // Ensure this path is correct
// Get student info by phone number
exports.getStudentByPhone = async (req, res) => {
    const phone = req.params.phone;
    
    try {
        // Fetch name from users table and other data from students table
        const result = await db.query(
            `SELECT u.name, s.university, s.location, s.schedule, s.attendance, s.phone
            FROM users u
            JOIN students s ON u.phone = s.phone
            WHERE u.phone = $1`,
            [phone]
        );
        
        console.log(result.rows); // Log the fetched student data for debugging

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(result.rows[0]); // Return the student's data as JSON
    } catch (err) {
        console.error('Database error:', err); // Detailed logging
        res.status(500).json({ error: 'Internal Server Error', message: err.message }); // Include error message in response
    }
};


// Update student info by phone number
exports.updateStudent = async (req, res) => {
    const phone = req.params.phone;
    const { name, university, location, schedule, attendance } = req.body;

    try {
        // Update name in the users table
        await db.query(
            `UPDATE users 
             SET name = $1 
             WHERE phone = $2`,
            [name, phone]
        );

        // Update other student info in the students table
        await db.query(
            `UPDATE students 
             SET university = $1, location = $2, schedule = $3, attendance = $4 
             WHERE phone = $5`,
            [university, location, schedule, attendance, phone]
        );

        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
