export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  permissions: string[]
}

export interface Client {
  id: string
  name: string
  cnpj: string
  email: string
  phone: string
  address: string
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  status: 'pending' | 'approved' | 'rejected'
  clientId: string
  url: string
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
  link?: string
}

export interface Theme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface Metrics {
  totalClients: number
  totalDocuments: number
  totalContracts: number
  lastUpdate: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
} 