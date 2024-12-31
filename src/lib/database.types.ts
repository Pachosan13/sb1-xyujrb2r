export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          email: string
          country_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string
          email: string
          country_code?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          email?: string
          country_code?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'ingreso' | 'gasto'
          amount: number
          description: string
          category: string
          subcategory: string
          date: string
          created_at: string
        }
        Insert: {
          user_id: string
          type: 'ingreso' | 'gasto'
          amount: number
          description: string
          category: string
          subcategory: string
          date: string
        }
        Update: {
          amount?: number
          description?: string
          category?: string
          subcategory?: string
          date?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          role: 'user' | 'assistant'
          content: string
          timestamp: string
        }
        Insert: {
          user_id: string
          role: 'user' | 'assistant'
          content: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_url: string
          file_type: string
          file_size: number
          uploaded_at: string
        }
        Insert: {
          user_id: string
          file_name: string
          file_url: string
          file_type: string
          file_size: number
        }
      }
    }
  }
}