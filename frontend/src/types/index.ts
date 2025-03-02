export interface Book {
  id: string;
  title: string;
  author: string;
  cover_image: string;
  description?: string;
}

export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
} 