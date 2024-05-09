import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/models/movie.model'
import { UserModel } from 'src/user/models/user.model'

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
	@prop()
	value: number

	@prop({ ref: () => MovieModel })
	movieId: Ref<MovieModel>

	@prop({ ref: () => UserModel })
	userId: Ref<UserModel>
}
