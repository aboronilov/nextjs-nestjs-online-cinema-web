import { Injectable } from '@nestjs/common'
import { IFileResponse } from './interface/file.dto'
import { ensureDir, writeFile } from 'fs-extra'
import { path } from 'app-root-path'

@Injectable()
export class FileService {
	async saveFiles(
		files: Express.Multer.File[],
		folder?: string
	): Promise<IFileResponse> {
		let finalFolder = typeof folder === 'string' ? folder : 'default'
		const uploadFile = `${path}/uploads/${finalFolder}`
		await ensureDir(uploadFile)

		const res: IFileResponse[] = await Promise.all(
			files.map(async (file) => {
				const url = `${uploadFile}/${file.originalname}`
				await writeFile(url, file.buffer)
				return {
					url: `/uploads/${finalFolder}/${file.originalname}`,
					name: file.originalname,
				}
			})
		)

		return res[0]
	}
}
