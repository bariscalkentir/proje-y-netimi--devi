import { create } from 'zustand'

export interface User {
  username: string
  password: string
  role: 'admin' | 'mudur' | 'user'
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  bio?: string
  profileImage?: string
  userCode?: string
}

export interface Task {
  id: string
  title: string
  type: string
  description?: string
  deadline: string
  assignedTo: string
  assignedToCode?: string
  assignedBy: string
  completed: boolean
  status?: 'pending' | 'accepted' | 'rejected'
  files?: Array<{
    name: string
    content: string
    uploadDate: string
  }>
  notes?: string
  submittedAt?: string
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface Notification {
  id: string
  userId: string
  type: 'task-assignment' | 'task-accepted' | 'task-rejected' | 'deadline-warning'
  title: string
  message: string
  taskData?: Task
  read: boolean
  createdAt: string
}

interface AppState {
  currentUser: User | null
  users: User[]
  tasks: Task[]
  notes: Note[]
  notifications: Notification[]
  theme: 'light' | 'dark'
  
  // Actions
  setCurrentUser: (user: User | null) => void
  addUser: (user: User) => void
  updateUser: (username: string, updates: Partial<User>) => void
  deleteUser: (username: string) => void
  
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  
  addNote: (note: Note) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  
  addNotification: (notification: Notification) => void
  markNotificationRead: (id: string) => void
  deleteNotification: (id: string) => void
  
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
}

// LocalStorage helper fonksiyonları
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

const saveToStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Storage error:', error)
  }
}

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  users: [
    {
      username: 'admin',
      password: '1234',
      role: 'admin',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      userCode: '0001'
    },
    {
      username: 'mudur',
      password: '1234',
      role: 'mudur',
      email: 'mudur@example.com',
      firstName: 'Müdür',
      lastName: 'User',
      userCode: '0002'
    }
  ],
  tasks: [],
  notes: [],
  notifications: [],
  theme: 'light',

  setCurrentUser: (user) => {
    set({ currentUser: user })
    saveToStorage('currentUser', user)
  },
  
  addUser: (user) => set((state) => {
    const newUsers = [...state.users, user]
    saveToStorage('users', newUsers)
    return { users: newUsers }
  }),
  
  updateUser: (username, updates) => set((state) => {
    const newUsers = state.users.map(u => 
      u.username === username ? { ...u, ...updates } : u
    )
    const newCurrentUser = state.currentUser?.username === username 
      ? { ...state.currentUser, ...updates }
      : state.currentUser
    saveToStorage('users', newUsers)
    saveToStorage('currentUser', newCurrentUser)
    return { users: newUsers, currentUser: newCurrentUser }
  }),
  
  deleteUser: (username) => set((state) => {
    const newUsers = state.users.filter(u => u.username !== username)
    saveToStorage('users', newUsers)
    return { users: newUsers }
  }),
  
  addTask: (task) => set((state) => {
    const newTasks = [...state.tasks, task]
    saveToStorage('tasks', newTasks)
    return { tasks: newTasks }
  }),
  
  updateTask: (id, updates) => set((state) => {
    const newTasks = state.tasks.map(t => 
      t.id === id ? { ...t, ...updates } : t
    )
    saveToStorage('tasks', newTasks)
    return { tasks: newTasks }
  }),
  
  deleteTask: (id) => set((state) => {
    const newTasks = state.tasks.filter(t => t.id !== id)
    saveToStorage('tasks', newTasks)
    return { tasks: newTasks }
  }),
  
  addNote: (note) => set((state) => {
    const newNotes = [...state.notes, note]
    saveToStorage('notes', newNotes)
    return { notes: newNotes }
  }),
  
  updateNote: (id, updates) => set((state) => {
    const newNotes = state.notes.map(n => 
      n.id === id ? { ...n, ...updates } : n
    )
    saveToStorage('notes', newNotes)
    return { notes: newNotes }
  }),
  
  deleteNote: (id) => set((state) => {
    const newNotes = state.notes.filter(n => n.id !== id)
    saveToStorage('notes', newNotes)
    return { notes: newNotes }
  }),
  
  addNotification: (notification) => set((state) => {
    const newNotifications = [...state.notifications, notification]
    saveToStorage('notifications', newNotifications)
    return { notifications: newNotifications }
  }),
  
  markNotificationRead: (id) => set((state) => {
    const newNotifications = state.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    )
    saveToStorage('notifications', newNotifications)
    return { notifications: newNotifications }
  }),
  
  deleteNotification: (id) => set((state) => {
    const newNotifications = state.notifications.filter(n => n.id !== id)
    saveToStorage('notifications', newNotifications)
    return { notifications: newNotifications }
  }),
  
  setTheme: (theme) => {
    set({ theme })
    saveToStorage('theme', theme)
  },
  
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    saveToStorage('theme', newTheme)
    return { theme: newTheme }
  })
}))

// Store'u başlat (client-side'da)
if (typeof window !== 'undefined') {
  const savedTheme = getFromStorage('theme', 'light')
  const savedCurrentUser = getFromStorage('currentUser', null)
  const savedUsers = getFromStorage('users', null)
  const savedTasks = getFromStorage('tasks', [])
  const savedNotes = getFromStorage('notes', [])
  const savedNotifications = getFromStorage('notifications', [])
  
  useStore.setState({
    theme: savedTheme,
    currentUser: savedCurrentUser,
    users: savedUsers || useStore.getState().users,
    tasks: savedTasks,
    notes: savedNotes,
    notifications: savedNotifications
  })
}
