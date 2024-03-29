import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MovieInputCreate {
	@Field(() => String, {
		nullable: false,
		description: "User's title to the movie",
	})
	title: string;

	@Field(() => String, {
		nullable: true,
		description: "User's description to the movie",
	})
	description: string;
}

@InputType()
export class MovieInputEdit {
	@Field(() => Int)
	id: number;

	@Field(() => String, {
		nullable: false,
		description: "User's title to the movie",
	})
	title: string;

	@Field(() => String, {
		nullable: true,
		description: "User's description to the movie",
	})
	description: string;
}
