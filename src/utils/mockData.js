export const roleLandingPath = {
  student: '/app/student',
  lecturer: '/app/lecturer',
  admin: '/app/admin',
}

export const roleNavigation = {
  student: [
    { label: 'Dashboard', path: '/app/student' },
    { label: 'Courses', path: '/app/student/courses' },
    { label: 'Assignments', path: '/app/student/assignments' },
    { label: 'CodeSpace', path: '/app/student/codespace' },
    { label: 'Announcements', path: '/app/announcements' },
    { label: 'Profile', path: '/app/profile' },
  ],
  lecturer: [
    { label: 'Dashboard', path: '/app/lecturer' },
    { label: 'Course Content', path: '/app/lecturer/courses' },
    { label: 'Assignments', path: '/app/lecturer/assignments' },
    { label: 'Coding Challenges', path: '/app/lecturer/problems' },
    { label: 'Quizzes', path: '/app/lecturer/quizzes' },
    { label: 'Gradebook', path: '/app/lecturer/gradebook' },
    { label: 'Student Progress', path: '/app/lecturer/progress' },
    { label: 'Discussions', path: '/app/lecturer/discussions' },
    { label: 'Announcements', path: '/app/announcements' },
    { label: 'Profile', path: '/app/profile' },
  ],
  admin: [
    { label: 'Dashboard', path: '/app/admin' },
    { label: 'Students', path: '/app/admin/students' },
    { label: 'Lecturers', path: '/app/admin/lecturers' },
    { label: 'Courses', path: '/app/admin/courses' },
    { label: 'CodeSpace', path: '/app/admin/codespace' },
    { label: 'Assignments', path: '/app/admin/assignments' },
    { label: 'Quizzes', path: '/app/admin/quizzes' },
    { label: 'Announcements', path: '/app/announcements' },
    { label: 'Reports', path: '/app/admin/reports' },
    { label: 'Settings', path: '/app/admin/settings' },
  ],
}

export const dashboardStats = {
  student: [],
  lecturer: [],
  admin: [],
}

export const announcements = []
export const studentCourses = []
export const assignments = []
export const codingProblems = []
export const usersTable = []
export const courseManagementRows = []
export const adminStudents = []
export const adminLecturers = []
export const adminAssignments = []
export const adminQuizData = []
export const adminCodingChallenges = []
export const adminReports = []
export const lecturerCourses = []
export const courseContentItems = []
export const lecturerAssignments = []
export const submissionQueue = []
export const lecturerCodingChallenges = []
export const quizzes = []
export const gradebookRows = []
export const studentProgressRows = []
export const discussionThreads = []
export const platformHighlights = []
