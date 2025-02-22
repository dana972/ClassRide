const db = require('../config/db'); // Import your database connection

const Student = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM students');
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (studentData) => {
    const { name, university, location, schedule, attendance, payment_details } = studentData;
    const result = await db.query(
      `INSERT INTO students (name, university, location, schedule, attendance, payment_details)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, university, location, schedule, attendance, payment_details]
    );
    return result.rows[0];
  },

  update: async (id, studentData) => {
    const { name, university, location, schedule, attendance, payment_details } = studentData;
    const result = await db.query(
      `UPDATE students 
       SET name = $1, university = $2, location = $3, schedule = $4, attendance = $5, payment_details = $6 
       WHERE id = $7 RETURNING *`,
      [name, university, location, schedule, attendance, payment_details, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM students WHERE id = $1', [id]);
    return { message: 'Student deleted successfully' };
  }
};

module.exports = Student;
