import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const requiredConfig = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
}

export const isFirebaseConfigured =
  Object.values(requiredConfig).every(Boolean)

let servicesPromise = null

export async function getFirebaseServices() {
  if (!isFirebaseConfigured) {
    return null
  }

  if (!servicesPromise) {
    servicesPromise = (async () => {
      const app = initializeApp(firebaseConfig)

      const analytics =
        firebaseConfig.measurementId &&
        (await isSupported())
          ? getAnalytics(app)
          : null

      return {
        app,
        analytics,
        auth: getAuth(app),
        db: getFirestore(app),
        storage: getStorage(app),
      }
    })()
  }

  return servicesPromise
}