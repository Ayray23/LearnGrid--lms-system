import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { useAuth } from '../context/AuthContext'
import { roleLandingPath } from '../utils/mockData'

function lazyNamed(loader, exportName) {
  return lazy(() => loader().then((module) => ({ default: module[exportName] })))
}

const DashboardLayout = lazyNamed(() => import('../layouts/DashboardLayout'), 'DashboardLayout')
const HomePage = lazyNamed(() => import('../pages/public/HomePage'), 'HomePage')
const LoginPage = lazyNamed(() => import('../pages/public/LoginPage'), 'LoginPage')
const RegisterPage = lazyNamed(() => import('../pages/public/RegisterPage'), 'RegisterPage')
const ForgotPasswordPage = lazyNamed(() => import('../pages/public/ForgotPasswordPage'), 'ForgotPasswordPage')
const StudentDashboardPage = lazyNamed(() => import('../pages/student/StudentDashboardPage'), 'StudentDashboardPage')
const StudentCoursesPage = lazyNamed(() => import('../pages/student/StudentCoursesPage'), 'StudentCoursesPage')
const CourseDetailPage = lazyNamed(() => import('../pages/student/CourseDetailPage'), 'CourseDetailPage')
const StudentAssignmentsPage = lazyNamed(() => import('../pages/student/StudentAssignmentsPage'), 'StudentAssignmentsPage')
const CodeSpacePage = lazyNamed(() => import('../pages/student/CodeSpacePage'), 'CodeSpacePage')
const LecturerDashboardPage = lazyNamed(() => import('../pages/lecturer/LecturerDashboardPage'), 'LecturerDashboardPage')
const CourseManagementPage = lazyNamed(() => import('../pages/lecturer/CourseManagementPage'), 'CourseManagementPage')
const AssignmentManagementPage = lazyNamed(
  () => import('../pages/lecturer/AssignmentManagementPage'),
  'AssignmentManagementPage',
)
const CodingProblemsPage = lazyNamed(() => import('../pages/lecturer/CodingProblemsPage'), 'CodingProblemsPage')
const QuizManagementPage = lazyNamed(() => import('../pages/lecturer/QuizManagementPage'), 'QuizManagementPage')
const GradebookPage = lazyNamed(() => import('../pages/lecturer/GradebookPage'), 'GradebookPage')
const StudentProgressPage = lazyNamed(() => import('../pages/lecturer/StudentProgressPage'), 'StudentProgressPage')
const LecturerDiscussionsPage = lazyNamed(
  () => import('../pages/lecturer/LecturerDiscussionsPage'),
  'LecturerDiscussionsPage',
)
const AdminDashboardPage = lazyNamed(() => import('../pages/admin/AdminDashboardPage'), 'AdminDashboardPage')
const UserManagementPage = lazyNamed(() => import('../pages/admin/UserManagementPage'), 'UserManagementPage')
const PlatformCoursesPage = lazyNamed(() => import('../pages/admin/PlatformCoursesPage'), 'PlatformCoursesPage')
const AdminStudentsPage = lazyNamed(() => import('../pages/admin/AdminStudentsPage'), 'AdminStudentsPage')
const LecturerManagementPage = lazyNamed(() => import('../pages/admin/LecturerManagementPage'), 'LecturerManagementPage')
const AdminCodeSpacePage = lazyNamed(() => import('../pages/admin/AdminCodeSpacePage'), 'AdminCodeSpacePage')
const AdminAssignmentsPage = lazyNamed(() => import('../pages/admin/AdminAssignmentsPage'), 'AdminAssignmentsPage')
const AdminQuizzesPage = lazyNamed(() => import('../pages/admin/AdminQuizzesPage'), 'AdminQuizzesPage')
const AdminReportsPage = lazyNamed(() => import('../pages/admin/AdminReportsPage'), 'AdminReportsPage')
const AdminSettingsPage = lazyNamed(() => import('../pages/admin/AdminSettingsPage'), 'AdminSettingsPage')
const AnnouncementsPage = lazyNamed(() => import('../pages/shared/AnnouncementsPage'), 'AnnouncementsPage')
const ProfilePage = lazyNamed(() => import('../pages/shared/ProfilePage'), 'ProfilePage')
const NotFoundPage = lazyNamed(() => import('../pages/shared/NotFoundPage'), 'NotFoundPage')

function AppIndexRedirect() {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={roleLandingPath[currentUser.role] || '/login'} replace />
}

function RouteLoadingFallback() {
  return (
    <div className="screen-center">
      <div className="loading-panel">
        <span className="loader" />
        <p>Loading workspace...</p>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<AppIndexRedirect />} />

            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="student" element={<StudentDashboardPage />} />
              <Route path="student/courses" element={<StudentCoursesPage />} />
              <Route path="student/courses/:courseCode" element={<CourseDetailPage />} />
              <Route path="student/assignments" element={<StudentAssignmentsPage />} />
              <Route path="student/codespace" element={<CodeSpacePage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['lecturer']} />}>
              <Route path="lecturer" element={<LecturerDashboardPage />} />
              <Route path="lecturer/courses" element={<CourseManagementPage />} />
              <Route path="lecturer/assignments" element={<AssignmentManagementPage />} />
              <Route path="lecturer/problems" element={<CodingProblemsPage />} />
              <Route path="lecturer/quizzes" element={<QuizManagementPage />} />
              <Route path="lecturer/gradebook" element={<GradebookPage />} />
              <Route path="lecturer/progress" element={<StudentProgressPage />} />
              <Route path="lecturer/discussions" element={<LecturerDiscussionsPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="admin" element={<AdminDashboardPage />} />
              <Route path="admin/users" element={<UserManagementPage />} />
              <Route path="admin/courses" element={<PlatformCoursesPage />} />
              <Route path="admin/students" element={<AdminStudentsPage />} />
              <Route path="admin/lecturers" element={<LecturerManagementPage />} />
              <Route path="admin/codespace" element={<AdminCodeSpacePage />} />
              <Route path="admin/assignments" element={<AdminAssignmentsPage />} />
              <Route path="admin/quizzes" element={<AdminQuizzesPage />} />
              <Route path="admin/reports" element={<AdminReportsPage />} />
              <Route path="admin/settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
