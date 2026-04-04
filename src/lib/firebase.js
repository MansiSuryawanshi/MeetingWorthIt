import { initializeApp, getApps, deleteApp } from 'firebase/app'
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

const DEFAULT_CONFIG = {
  apiKey: "AIzaSyD6kuseDrOY1mffhecWyYZlDsGz8MiUKhA",
  authDomain: "meeting-26ae0.firebaseapp.com",
  projectId: "meeting-26ae0",
  storageBucket: "meeting-26ae0.firebasestorage.app",
  messagingSenderId: "787728175639",
  appId: "1:787728175639:web:7434ab3efef9720dac4252",
}

function getConfig() {
  const stored = localStorage.getItem('mwi_firebase_config')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (parsed.apiKey && parsed.projectId) return parsed
    } catch {}
  }
  return DEFAULT_CONFIG
}

function getDb() {
  const config = getConfig()
  // Reuse existing app if config hasn't changed
  const existing = getApps().find(a => a.name === '[DEFAULT]')
  if (existing) {
    return getFirestore(existing)
  }
  const app = initializeApp(config)
  return getFirestore(app)
}

export function saveFirebaseConfig(config) {
  // Tear down existing app so next call to getDb() reinitializes with new config
  const existing = getApps().find(a => a.name === '[DEFAULT]')
  if (existing) deleteApp(existing)
  localStorage.setItem('mwi_firebase_config', JSON.stringify(config))
}

export function clearFirebaseConfig() {
  const existing = getApps().find(a => a.name === '[DEFAULT]')
  if (existing) deleteApp(existing)
  localStorage.removeItem('mwi_firebase_config')
}

export function getStoredFirebaseConfig() {
  const stored = localStorage.getItem('mwi_firebase_config')
  if (stored) {
    try { return JSON.parse(stored) } catch {}
  }
  return null
}

export async function testFirebaseConnection() {
  const db = getDb()
  await getDocs(collection(db, 'team_members'))
  return true
}

export async function loadTeamMembers() {
  const db = getDb()
  const q = query(collection(db, 'team_members'), orderBy('name'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function addTeamMember(member) {
  const db = getDb()
  const docRef = await addDoc(collection(db, 'team_members'), {
    ...member,
    createdAt: new Date().toISOString(),
  })
  return { id: docRef.id, ...member }
}

export async function deleteTeamMember(id) {
  const db = getDb()
  await deleteDoc(doc(db, 'team_members', id))
}

export async function updateTeamMember(id, updates) {
  const db = getDb()
  await updateDoc(doc(db, 'team_members', id), updates)
  return { id, ...updates }
}
