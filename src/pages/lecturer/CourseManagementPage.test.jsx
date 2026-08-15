import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

vi.mock('../../firebase/services', () => ({
  courseService: { listCourses: vi.fn() },
  materialService: {
    listCourseMaterials: vi.fn(),
    createMaterial: vi.fn(),
  },
  storageService: {
    uploadCourseMaterial: vi.fn(),
  },
}))

import { courseService, materialService, storageService } from '../../firebase/services'
import { CourseManagementPage } from './CourseManagementPage'

const course = { id: 'course-1', code: 'SEN301', title: 'Software Engineering' }

describe('CourseManagementPage material upload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    courseService.listCourses.mockResolvedValue([course])
    materialService.listCourseMaterials.mockResolvedValue([])
    materialService.createMaterial.mockResolvedValue({ id: 'material-1' })
  })

  it('uploads the selected file to storage before saving the material record', async () => {
    storageService.uploadCourseMaterial.mockResolvedValue({
      fileUrl: 'https://storage.example.com/course-materials/course-1/notes.pdf',
      fileName: 'notes.pdf',
      filePath: 'course-materials/course-1/123-notes.pdf',
      contentType: 'application/pdf',
      size: 1024,
    })

    render(<CourseManagementPage />)

    await waitFor(() => {
      expect(screen.getByText(/Upload material/i)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /Upload material/i }))

    await userEvent.type(screen.getByPlaceholderText('Week 3 UML Diagrams'), 'Week 1 Notes')

    const file = new File(['pdf-bytes'], 'notes.pdf', { type: 'application/pdf' })
    const fileInput = screen.getByLabelText(/File \(optional/i)
    await userEvent.upload(fileInput, file)

    await userEvent.click(screen.getByRole('button', { name: /Add material/i }))

    await waitFor(() => {
      expect(storageService.uploadCourseMaterial).toHaveBeenCalledWith({
        file,
        courseId: 'course-1',
      })
    })

    await waitFor(() => {
      expect(materialService.createMaterial).toHaveBeenCalledWith(
        expect.objectContaining({
          courseId: 'course-1',
          title: 'Week 1 Notes',
          fileUrl: 'https://storage.example.com/course-materials/course-1/notes.pdf',
          fileName: 'notes.pdf',
        })
      )
    })
  })

  it('saves the material without a file when none is selected', async () => {
    render(<CourseManagementPage />)

    await waitFor(() => {
      expect(screen.getByText(/Upload material/i)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /Upload material/i }))
    await userEvent.type(screen.getByPlaceholderText('Week 3 UML Diagrams'), 'External reading link')
    await userEvent.click(screen.getByRole('button', { name: /Add material/i }))

    await waitFor(() => {
      expect(materialService.createMaterial).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'External reading link', fileUrl: '' })
      )
    })

    expect(storageService.uploadCourseMaterial).not.toHaveBeenCalled()
  })
})
