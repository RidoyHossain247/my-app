/**
 * Example API file showing how to create reusable API functions
 * You can create similar files for different resources (users, products, etc.)
 */

import { apiService } from "../api-client"

// Example types
export interface User {
  id: string
  name: string
  email: string
}

export interface CreateUserRequest {
  name: string
  email: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
}

// Example API functions - Replace with your actual endpoints
export const exampleAPI = {
  // GET - Fetch all users
  getUsers: async (): Promise<User[]> => {
    return apiService.get<User[]>("/users")
  },

  // GET - Fetch single user by ID
  getUser: async (id: string): Promise<User> => {
    return apiService.get<User>(`/users/${id}`)
  },

  // POST - Create new user
  createUser: async (data: CreateUserRequest): Promise<User> => {
    return apiService.post<User>("/users", data)
  },

  // PUT - Update user
  updateUser: async (id: string, data: UpdateUserRequest): Promise<User> => {
    return apiService.put<User>(`/users/${id}`, data)
  },

  // PATCH - Partial update user
  patchUser: async (id: string, data: Partial<UpdateUserRequest>): Promise<User> => {
    return apiService.patch<User>(`/users/${id}`, data)
  },

  // DELETE - Delete user
  deleteUser: async (id: string): Promise<{ message: string }> => {
    return apiService.delete<{ message: string }>(`/users/${id}`)
  },
}

/**
 * Usage example in a component:
 * 
 * import { exampleAPI } from "@/lib/api/example-api"
 * 
 * const fetchUsers = async () => {
 *   try {
 *     const users = await exampleAPI.getUsers()
 *     console.log(users)
 *   } catch (error) {
 *     console.error("Failed to fetch users:", error)
 *   }
 * }
 */

