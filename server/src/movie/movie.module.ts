import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { PrismaService } from 'server/prisma/prisma.service';

@Module({
	imports: [],
	providers: [MovieService, MovieResolver, PrismaService],
	exports: [MovieResolver, MovieService],
})
export class MovieModule {}
