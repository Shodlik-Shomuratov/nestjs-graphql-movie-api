import * as faker from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export interface MovieInputCreate {
	title: string;
	description?: string;
}

export interface UserInput {
	username: string;
	description?: string;
}

export interface MovieCommentLikeInput {
	movieCommentId: number;
	userId: number;
}

export interface MovieCommentInput {
	description: string;
	movieId: number;
	userId: number;
	likes: number;
}

const prisma = new PrismaClient();

const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createManyMovies = async () => {
	if ((await prisma.movie.count()) !== 0) {
		return;
	}

	const movies = [];

	for (let i = 0; i < 100; i++) {
		// create data
		const movie: MovieInputCreate = {
			title: `${faker.faker.commerce.productAdjective()} ${faker.faker.commerce.product()}`,
			description: faker.faker.word.words(6),
		};

		movies.push(movie);
	}

	await prisma.movie.createMany({
		data: movies,
	});
};

const createManyUsers = async () => {
	if ((await prisma.user.count()) !== 0) {
		return;
	}

	const users = [];

	for (let i = 0; i < 100; i++) {
		// create data
		const user: UserInput = {
			username: faker.faker.internet.userName(),
			description: faker.faker.word.words(10),
		};

		users.push(user);
	}

	// insert to DB
	await prisma.user.createMany({
		data: users,
	});
};

const createManyCommentsOnMovies = async () => {
	if ((await prisma.movieComment.count()) !== 0) {
		return;
	}

	const allMovies = await prisma.movie.findMany();
	const allUsers = await prisma.user.findMany();

	const comments = [];

	for await (const movie of allMovies) {
		const randomLoop = getRandomInt(5, 25);

		// add N comments to each movie
		for (let i = 0; i < randomLoop; i++) {
			const randomUserId = getRandomInt(0, allUsers.length - 1);
			const user = allUsers[randomUserId];

			// create model
			const comment: MovieCommentInput = {
				description: faker.faker.word.words(6),
				userId: user.id,
				movieId: movie.id,
				likes: getRandomInt(2, 8),
			};

			comments.push(comment);
		}
	}

	// insert model into DB
	await prisma.movieComment.createMany({
		data: comments,
	});
};

const run = async () => {
	const prisma = new PrismaClient();
	try {
		console.log('createManyMovies() -> start');
		await createManyMovies();
		console.log('createManyMovies() -> done');

		console.log('createManyUsers() -> start');
		await createManyUsers();
		console.log('createManyUsers() -> done');

		console.log('createManyCommentsOnMovies() -> start');
		await createManyCommentsOnMovies();
		console.log('createManyCommentsOnMovies() -> done');
	} finally {
		await prisma.$disconnect();
	}
};

run();
