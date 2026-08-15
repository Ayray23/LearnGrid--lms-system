import { roleLandingPath, roleNavigation } from './mockData'

describe('mockData constants', () => {
  it('defines landing paths for each role', () => {
    expect(roleLandingPath).toEqual({
      student: '/app/student',
      lecturer: '/app/lecturer',
      admin: '/app/admin',
    })
  })

  it('exports navigation items for all roles', () => {
    expect(roleNavigation.student.some((item) => item.path === '/app/student')).toBe(true)
    expect(roleNavigation.lecturer.some((item) => item.path === '/app/lecturer')).toBe(true)
    expect(roleNavigation.admin.some((item) => item.path === '/app/admin')).toBe(true)
  })
})
