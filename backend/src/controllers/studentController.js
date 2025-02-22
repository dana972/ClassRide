const db = require('../config/db'); // Ensure this path is correct

// Get student by ID
exports.getStudentById = async (req, res) => {
    const studentId = req.params.id;
    
    try {
        const result = await db.query('SELECT * FROM students WHERE student_id = $1', [studentId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update student info
exports.updateStudent = async (req, res) => {
    const studentId = req.params.id;
    const { name, university, location, schedule, attendance, payment_details } = req.body;

    try {
        await db.query(
            `UPDATE students 
             SET name = $1, university = $2, location = $3, schedule = $4, attendance = $5, payment_details = $6 
             WHERE student_id = $7`,
            [name, university, location, schedule, attendance, JSON.stringify(payment_details), studentId]
        );

        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
