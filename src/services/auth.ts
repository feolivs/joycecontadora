import { apiService } from './api'
import { User } from '../types'
import { config } from '../config/env'

interface LoginCredentials {
  email: string
  password: string
}

interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials)
    
    if (response.success) {
      this.setTokens(response.data.token, response.data.refreshToken)
    }
    
    return response.data
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout')
    } finally {
      this.clearTokens()
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiService.get<User>('/auth/me')
      return response.data
    } catch {
      return null
    }
  }

  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(config.auth.tokenKey, token)
    localStorage.setItem(config.auth.refreshTokenKey, refreshToken)
  }

  private clearTokens(): void {
    localStorage.removeItem(config.auth.tokenKey)
    localStorage.removeItem(config.auth.refreshTokenKey)
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(config.auth.tokenKey)
  }

  getToken(): string | null {
    return localStorage.getItem(config.auth.tokenKey)
  }
}

export const authService = new AuthService() 