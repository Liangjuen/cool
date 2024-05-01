import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

enum Mode {
	Cloud = 'cloud',
	Local = 'local'
}

export class FileUpload {
	@IsNotEmpty()
	@IsEnum(Mode)
	mode: Mode

	@IsNotEmpty()
	@IsString()
	domain: string
}
