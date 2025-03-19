export interface User {
  id?: string;
  name: string;
  username: string;

  email: string;
  password?: string;
  role: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
