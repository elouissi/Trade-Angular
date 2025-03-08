export interface Message {
  id?: string
  body: string
  attachment?: string
  isRead: boolean
  senderId: string
  receiverId: string
  createdAt?: Date
}
export interface Message {
  id?: string
  body: string
  attachment?: string
  isRead: boolean
  senderId: string
  receiverId: string
  createdAt?: Date
}


export interface User {
  id?: string
  name: string
  email: string
  location?: string
  // Pas d'avatar dans le modèle
}



