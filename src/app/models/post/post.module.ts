export enum PostStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXCHANGED = "EXCHANGED",
}
export enum PostSelect {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
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

