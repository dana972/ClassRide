const db = require('../config/db'); // Import your database connection

const Student = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM students');
    return result.rows;
  },

  getByPhone: async (phone) => {
    const result = await db.query('SELECT * FROM students WHERE phone = $1', [phone]);
    return result.rows[0];
  },

  create: async (studentData) => {
    const { name, university, location, schedule, attendance, phone } = studentData;
    const result = await db.query(
      `INSERT INTO students (name, university, location, schedule, attendance, phone)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, university, location, schedule, attendance, phone]
    );
    return result.rows[0];
  },

  update: async (phone, studentData) => {
    const { name, university, location, schedule, attendance } = studentData;
    const result = await db.query(
      `UPDATE students 
       SET name = $1, university = $2, location = $3, schedule = $4, attendance = $5 
       WHERE phone = $6 RETURNING *`,
      [name, university, location, schedule, attendance, phone]
    );
    return result.rows[0];
  },

  delete: async (phone) => {
    await db.query('DELETE FROM students WHERE phone = $1', [phone]);
    return { message: 'Student deleted successfully' };
  }
};

module.exports = Student;
