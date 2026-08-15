/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { getFirebaseServices, isFirebaseConfigured } from '../firebase/config'
import { userService } from '../firebase/services'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'

const AuthContext = createContext(null)

const STORAGE_KEY = 'se-lms-profile'
function readStoredProfile() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStoredProfile(profile) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

function clearStoredProfile() {
  window.localStorage.removeItem(STORAGE_KEY)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [firebaseServices, setFirebaseServices] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return undefined
    }

    let unsubscribe = null
    let mounted = true

    getFirebaseServices()
      .then((services) => {
        if (!mounted || !services) return

        setFirebaseServices(services)
        unsubscribe = onAuthStateChanged(services.auth, (user) => {
          const handleAuthState = async () => {
            if (!user) {
              setCurrentUser(null)
              clearStoredProfile()
              setLoading(false)
              return
            }

            const storedProfile = readStoredProfile()
            let profile = {
              uid: user.uid,
              name: storedProfile?.name || user.displayName || 'SE-LMS User',
              email: user.email || storedProfile?.email || '',
              role: storedProfile?.role || 'student',
              department: storedProfile?.department || 'Software Engineering',
            }

            try {
              const firestoreProfile = await userService.getProfile(user.uid)
              if (firestoreProfile) {
                profile = {
                  uid: firestoreProfile.id,
                  ...firestoreProfile,
                }
              } else {
                await userService.createProfile(profile)
              }
            } catch (error) {
              console.error('Unable to load or save Firestore profile:', error)
            }

            writeStoredProfile(profile)
            setCurrentUser(profile)
            setLoading(false)
          }

          handleAuthState()
        })
      })
      .catch(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const login = async ({ email, password, role = 'student' }) => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Live login is unavailable.')
    }

    const services = firebaseServices || await getFirebaseServices()
    if (!firebaseServices) {
      setFirebaseServices(services)
    }

    const credential = await signInWithEmailAndPassword(services.auth, email, password)
    const storedProfile = readStoredProfile()
    let profile = {
      uid: credential.user.uid,
      name: storedProfile?.name || credential.user.displayName || 'SE-LMS User',
      email: credential.user.email || email,
      role: storedProfile?.role || role,
      department: storedProfile?.department || 'Software Engineering',
    }

    try {
      const firestoreProfile = await userService.getProfile(credential.user.uid)
      if (firestoreProfile) {
        profile = {
          uid: firestoreProfile.id,
          ...firestoreProfile,
        }
      } else {
        await userService.createProfile(profile)
      }
    } catch (error) {
      console.error('Unable to load or save Firestore profile during login:', error)
    }

    writeStoredProfile(profile)
    setCurrentUser(profile)
    return profile
  }

  const register = async ({
    name,
    email,
    password,
    role,
    department,
  }) => {
    const profile = {
      uid: crypto.randomUUID(),
      name,
      email,
      role,
      department,
    }

    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Live registration is unavailable.')
    }

    const services = firebaseServices || await getFirebaseServices()
    if (!firebaseServices) {
      setFirebaseServices(services)
    }

    const credential = await createUserWithEmailAndPassword(services.auth, email, password)
    await updateProfile(credential.user, { displayName: name })

    const firebaseProfile = {
      ...profile,
      uid: credential.user.uid,
    }

    await userService.createProfile(firebaseProfile)
    writeStoredProfile(firebaseProfile)
    setCurrentUser(firebaseProfile)
    return firebaseProfile
  }

  const logout = async () => {
    clearStoredProfile()

    if (isFirebaseConfigured) {
      const services = firebaseServices || await getFirebaseServices()
      await signOut(services.auth)
    }

    setCurrentUser(null)
  }

  const resetPassword = async (email) => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Password reset is unavailable.')
    }

    const services = firebaseServices || await getFirebaseServices()
    if (!firebaseServices) {
      setFirebaseServices(services)
    }

    await sendPasswordResetEmail(services.auth, email)
    return 'Password reset email sent successfully.'
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
        resetPassword,
        isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
