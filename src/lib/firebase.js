import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD6kuseDrOY1mffhecWyYZlDsGz8MiUKhA",
  authDomain: "meeting-26ae0.firebaseapp.com",
  projectId: "meeting-26ae0",
  storageBucket: "meeting-26ae0.firebasestorage.app",
  messagingSenderId: "787728175639",
  appId: "1:787728175639:web:7434ab3efef9720dac4252",
  measurementId: "G-F7M5HPKHD4"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function testFirebaseConnection() {
  await getDocs(collection(db, 'team_members'))
  return true
}

export async function loadTeamMembers() {
  const q = query(collection(db, 'team_members'), orderBy('name'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function addTeamMember(member) {
  const docRef = await addDoc(collection(db, 'team_members'), {
    ...member,
    createdAt: new Date().toISOString(),
  })
  return { id: docRef.id, ...member }
}

export async function deleteTeamMember(id) {
  await deleteDoc(doc(db, 'team_members', id))
}

export async function updateTeamMember(id, updates) {
  await updateDoc(doc(db, 'team_members', id), updates)
  return { id, ...updates }
}
