import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
	@Field(() => Int)
	id: number;

	@Field(() => String, {
		nullable: false,
		description: "User's title to the movie",
		defaultValue: '',
	})
	title: string;

	@Field(() => String, {
		nullable: true,
		description: "User's description to the movie",
	})
	description: string;

	@Field(() => String)
	createdAt: Date;

	@Field(() => String)
	updatedAt: Date;
}
