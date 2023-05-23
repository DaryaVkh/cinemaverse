import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from '../films/films.models';
import { FilmsService } from '../films/films.service';
import { createSHA256, delay } from '../helpers/functions';
import { User } from './user.entity';
import { CreateUserDto } from './users.models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly filmsService: FilmsService,
  ) {}

  public async create(user: CreateUserDto, salt: string): Promise<User> {
    const isEmailAlreadyRegistered = await this.exists(user.email);
    if (isEmailAlreadyRegistered) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Пользователь с таким email уже зарегистрирован',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdUser = new this.userModel({
      ...user,
      password: createSHA256(user.password, salt),
    });
    return createdUser.save();
  }

  public async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  public async findFavoriteFilms(userId: string): Promise<Film[]> {
    const user = await this.userModel.findById(userId).exec();
    const responses = [];

    for (const filmId of user.favoriteFilms) {
      await delay(300);
      const response = await this.filmsService.getFilm(filmId);
      responses.push(response);
    }

    return responses;
  }

  public async addFavoriteFilm(
    userId: string,
    film: string,
  ): Promise<string[]> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { favoriteFilms: `${film}` } },
      { new: true },
    );
    return user.favoriteFilms;
  }

  public async removeFromFavorites(
    userId: string,
    filmId: string,
  ): Promise<string[]> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favoriteFilms: `${filmId}` } },
      { new: true },
    );
    return user.favoriteFilms;
  }

  public async verifyUser(
    email: string,
    password: string,
    salt: string,
  ): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && createSHA256(password, salt) === user.password) {
      return user;
    }
    return null;
  }

  public async exists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }
}
