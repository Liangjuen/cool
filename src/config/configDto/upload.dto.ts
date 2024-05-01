import {
	IsString,
	IsNotEmpty,
	IsAlpha,
	IsOptional,
	IsInt,
	Min,
	Max,
	IsArray
} from 'class-validator'

/**
 * 本地上传
 */
export class Upload {
	@IsNotEmpty()
	@IsString()
	@IsAlpha()
	dirname: string

	@IsOptional()
	@IsInt({ message: '上传大小为正整数' })
	@Min(1)
	maxSize?: number

	@IsOptional()
	@IsInt({ message: '最大上传数为正整数' })
	@Min(1, { message: '最大上传数取值范围 1 - 20' })
	@Max(20, { message: '最大上传数取值范围 1 - 20' })
	limit?: number

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	accept?: string[]
}
