export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
