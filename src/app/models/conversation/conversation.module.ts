export interface Conversation {
  id?: string
  senderId: string
  receiverId: string
  postId: string
}

export interface ConversationDTO {
  id?: string
  senderId: string
  receiverId: string
  postId: string
  lastMessage?: string
  unreadCount?: number
  postTitle?: string
  postImage?: string
  senderName?: string
  receiverName?: string
  updatedAt?: Date
}

