export interface Message {
  id?: string
  body: string
  attachment?: string
  isRead: boolean
  conversationId: string
  // Ces champs sont dérivés de la conversation
  senderId?: string
  receiverId?: string
  postId?: string
  createdAt?: Date
}

export interface User {
  id?: string
  name: string
  email: string
  location?: string
}

