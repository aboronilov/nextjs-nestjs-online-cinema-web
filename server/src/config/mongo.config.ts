import { ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'

export const getMongoDbConfig = async (
  configService: ConfigService
): Promise<TypegooseModule> => ({
  uri: configService.get('MONGO_URI'),
})
