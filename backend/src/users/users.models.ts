export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export const JWT_ALGORITHM = 'HS256';

export interface LoggedUserDto {
  id: string;
  name: string;
  email: string;
  favoriteFilms: string[];
  token: string;
}
