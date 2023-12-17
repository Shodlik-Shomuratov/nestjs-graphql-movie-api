import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Movie } from '@prisma/client';
import { MovieInputCreate, MovieInputEdit } from './movie.input';

@Injectable()
export class MovieService {
	constructor(private prismaService: PrismaService) {}

	async getAllMovies(): Promise<Movie[]> {
		return this.prismaService.movie.findMany();
	}

	async getMovieById(id: number): Promise<Movie> {
		return this.prismaService.movie.findFirstOrThrow({
			where: {
				id,
			},
		});
	}

	async createMovie({
		title,
		description,
	}: MovieInputCreate): Promise<Movie> {
		return this.prismaService.movie.create({
			data: {
				title,
				description,
			},
		});
	}

	async editMovie({
		id,
		title,
		description,
	}: MovieInputEdit): Promise<Movie> {
		return this.prismaService.movie.upsert({
			update: {
				title,
				description,
			},
			create: {
				title,
				description,
			},
			where: {
				id,
			},
		});
	}

	async deleteMovie(movieId: number): Promise<Movie> {
		return this.prismaService.movie.delete({
			where: {
				id: movieId,
			},
		});
	}
}
