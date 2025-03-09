const db = require('../config/db'); // Ensure this path is correct

// Get student by phone number
exports.getStudentByPhone = async (req, res) => {
    const phone = req.params.phone;
    
    try {
        // Fetch student info including university, location, schedule, and attendance
        const result = await db.query(
            'SELECT name, university, location, schedule, attendance, phone FROM students WHERE phone = $1',
            [phone]
        );
                    console.log(studentResult.rows); // Add this log to check the results

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(result.rows[0]); // Return the student's data
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update student info by phone number
exports.updateStudent = async (req, res) => {
    const phone = req.params.phone;
    const { name, university, location, schedule, attendance, payment_details } = req.body;

    try {
        await db.query(
            `UPDATE students 
             SET name = $1, university = $2, location = $3, schedule = $4, attendance = $5, payment_details = $6 
             WHERE phone = $7`,
            [name, university, location, schedule, attendance, JSON.stringify(payment_details), phone]
        );

        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
