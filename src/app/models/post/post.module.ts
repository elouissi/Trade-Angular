export enum PostStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface Photo {
  title: string
  filePath: string
}

export interface Post {
  id?: string
  title: string
  description: string
  category: string
  location: string
  status: PostStatus
  userId: string
  photos: Photo[]
}

