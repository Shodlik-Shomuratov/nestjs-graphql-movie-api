import {
	Args,
	Int,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { MovieInputCreate } from './movie.input';

@Resolver(() => Movie)
export class MovieResolver {
	constructor(private readonly movieService: MovieService) {}

	@Query(() => [Movie])
	async getAllMovies(): Promise<Movie[]> {
		return this.movieService.getAllMovies();
	}

	@Query(() => Movie)
	async getMovieById(
		@Args('id', {
			type: () => Int,
		})
		id: number,
	): Promise<Movie> {
		return this.movieService.getMovieById(id);
	}

	@Mutation(() => Movie)
	async createMovie(
		@Args('movieInputCreate') movieInputCreate: MovieInputCreate,
	): Promise<Movie> {
		return this.movieService.createMovie(movieInputCreate);
	}

	@ResolveField('movieComment', () => [String])
	async getMovieComment(@Parent() movie: Movie) {
		return ['Test 1', 'Test 2'];
	}
}
