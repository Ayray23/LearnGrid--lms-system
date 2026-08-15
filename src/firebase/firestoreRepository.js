import { getFirebaseServices, isFirebaseConfigured } from './config'

async function getFirestoreModule() {
  if (!isFirebaseConfigured) {
    return null
  }

  const services = await getFirebaseServices()
  const firestoreModule = await import('firebase/firestore')

  return {
    db: services.db,
    firestoreModule,
  }
}

function attachTimestamps(payload, includeCreatedAt = false) {
  const now = new Date().toISOString()

  return {
    ...payload,
    ...(includeCreatedAt ? { createdAt: now } : {}),
    updatedAt: now,
  }
}

export async function createRecord(collectionName, payload, id) {
  const context = await getFirestoreModule()
  if (!context) return null

  const { db, firestoreModule } = context
  const data = attachTimestamps(payload, true)

  if (id) {
    const recordRef = firestoreModule.doc(db, collectionName, id)
    await firestoreModule.setDoc(recordRef, data)
    return { id, ...data }
  }

  const recordRef = await firestoreModule.addDoc(firestoreModule.collection(db, collectionName), data)
  return { id: recordRef.id, ...data }
}

export async function updateRecord(collectionName, id, payload) {
  const context = await getFirestoreModule()
  if (!context) return null

  const { db, firestoreModule } = context
  const data = attachTimestamps(payload)
  await firestoreModule.updateDoc(firestoreModule.doc(db, collectionName, id), data)

  return { id, ...data }
}

export async function deleteRecord(collectionName, id) {
  const context = await getFirestoreModule()
  if (!context) return false

  const { db, firestoreModule } = context
  await firestoreModule.deleteDoc(firestoreModule.doc(db, collectionName, id))

  return true
}

export async function getRecord(collectionName, id) {
  const context = await getFirestoreModule()
  if (!context) return null

  const { db, firestoreModule } = context
  const snapshot = await firestoreModule.getDoc(firestoreModule.doc(db, collectionName, id))

  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}

export async function listRecords(collectionName, constraints = []) {
  const context = await getFirestoreModule()
  if (!context) return []

  const { db, firestoreModule } = context
  const collectionRef = firestoreModule.collection(db, collectionName)
  const queryRef = constraints.length ? firestoreModule.query(collectionRef, ...constraints) : collectionRef
  const snapshot = await firestoreModule.getDocs(queryRef)

  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
}

export async function makeQueryConstraints(buildConstraints) {
  const context = await getFirestoreModule()
  if (!context) return []

  return buildConstraints(context.firestoreModule)
}
