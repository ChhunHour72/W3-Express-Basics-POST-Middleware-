// server.js
import express from 'express';
import courses from './course.js';

const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Filter courses by department
    let filteredCourses = courses.filter(course => 
        course.department.toLowerCase() === dept.toLowerCase()
    );

    // Apply additional filters if provided
    if (level) {
        filteredCourses = filteredCourses.filter(course => 
            course.level.toLowerCase() === level.toLowerCase()
        );
    }

    if (minCredits) {
        const min = parseInt(minCredits);
        filteredCourses = filteredCourses.filter(course => 
            course.credits >= min
        );
    }

    if (maxCredits) {
        const max = parseInt(maxCredits);
        filteredCourses = filteredCourses.filter(course => 
            course.credits <= max
        );
    }

    if (semester) {
        filteredCourses = filteredCourses.filter(course => 
            course.semester.toLowerCase() === semester.toLowerCase()
        );
    }

    if (instructor) {
        filteredCourses = filteredCourses.filter(course => 
            course.instructor.toLowerCase().includes(instructor.toLowerCase())
        );
    }

    // Handle invalid credit range
    if (minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)) {
        return res.status(400).json({
            error: 'Invalid credit range: minCredits cannot be greater than maxCredits'
        });
    }

    // Return response
    res.json({
        results: filteredCourses,
        meta: {
            total: filteredCourses.length
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
