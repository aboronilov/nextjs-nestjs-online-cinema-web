import { Injectable } from '@nestjs/common'
import { IFileResponse } from './interface/file.dto'
import { ensureDir, writeFile } from 'fs-extra'
import { path } from 'app-root-path'

@Injectable()
export class FileService {
	async saveFiles(
		files: Express.Multer.File[],
		folder: string = 'defualt'
	): Promise<IFileResponse> {
		const uploadFile = `${path}/uploads/${folder}`
		await ensureDir(uploadFile)

		const res: IFileResponse[] = await Promise.all(
			files.map(async (file) => {
				const url = `${uploadFile}/${file.originalname}`
				await writeFile(url, file.buffer)
				return {
					url: `/uploads/${folder}/${file.originalname}`,
					name: file.originalname,
				}
			})
		)

		return res[0]
	}
}
