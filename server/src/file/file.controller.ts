import { Controller, Post } from '@nestjs/common'
import { FileService } from './file.service'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('upload')
	@Auth('admin')
	async saveFiles(): Promise<void> {
		return await this.fileService.saveFiles()
	}
}
