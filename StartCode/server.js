// server.js
import express from 'express';
import courses from './course.js';
import { requestLogger } from './logger.js';
import { validateQueryParams } from './validateQuery.js';
import { authenticate } from './auth.js'; // Optional

const app = express();
const PORT = 3000;

// 1️⃣ Apply GLOBAL middleware (runs on every request)
app.use(requestLogger);

// 2️⃣ Apply ROUTE-SPECIFIC middleware
app.get('/departments/:dept/courses', 
    // authenticate, // 🔐 Uncomment to enable token check
    validateQueryParams, // ✅ Validates min/maxCredits
    (req, res) => {
        const { dept } = req.params;
        const { level, minCredits, maxCredits, semester, instructor } = req.query;

        // Filter courses (same as Exercise 2)
        let filteredCourses = courses.filter(course => 
            course.department.toLowerCase() === dept.toLowerCase()
        );

        if (level) filteredCourses = filteredCourses.filter(c => c.level === level);
        if (minCredits) filteredCourses = filteredCourses.filter(c => c.credits >= Number(minCredits));
        if (maxCredits) filteredCourses = filteredCourses.filter(c => c.credits <= Number(maxCredits));
        if (semester) filteredCourses = filteredCourses.filter(c => c.semester === semester);
        if (instructor) filteredCourses = filteredCourses.filter(c => 
            c.instructor.toLowerCase().includes(instructor.toLowerCase())
        );

        res.json({ 
            results: filteredCourses,
            meta: { total: filteredCourses.length } 
        });
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});