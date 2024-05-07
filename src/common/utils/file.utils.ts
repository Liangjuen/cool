import { unlink } from 'node:fs'
import { join } from 'node:path'

/**
 * 删除本地上传的文件
 * @param path 文件名
 */
export const deleteFile = (path: string) => {
	unlink(join(process.cwd(), 'public', path), err => {
		// console.log(err)
	})
}

enum FileType {
	IMAGE = 'image',
	WORD = 'word',
	AUDIO = 'audio',
	VIDEO = 'video',
	PPT = 'ppt',
	EXCEl = 'excel',
	FILE = 'file',
	PDF = 'pdf',
	RAR = 'rar'
}

/**
 * bytes 格式化
 * @param bytes number
 * @param decimals number
 * @returns B、KB、MB、GB、TB、PB ...
 */
export const formatBytes = (bytes: number, decimals = 2) => {
	if (bytes == 0) return '0 B'
	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 获取文件类型
 * @param ext 扩展名
 * @returns
 */
export const getFileType = (ext: string) => {
	const pdf = ['pdf']
	const rar = ['rar', 'zip']
	const excel = ['xls', 'xlt', 'et', 'xlsx', 'xltx', 'xlsm', 'xltm']
	const image = ['bmp', 'jpg', 'jpeg', 'png', 'tif', 'gif', 'svg', 'webp']
	const word = ['doc', 'dot', 'wps', 'wpt', 'docx', 'dotx', 'docm', 'dotm']
	const audio = ['mp3', 'wav', 'wma', 'mp2', 'flac', 'midi', 'ra', 'ape', 'aac', 'cda']
	const video = ['avi', 'wmv', 'mpg', 'mpeg', 'mov', 'rm', 'ram', 'swf', 'flv', 'mp4']
	const ppt = ['ppt', 'pptx', 'pptm', 'ppsx', 'ppsm', 'pps', 'potx', 'potm', 'dpt', 'dps']

	if (pdf.includes(ext)) return FileType.PDF
	if (rar.includes(ext)) return FileType.RAR
	if (excel.includes(ext)) return FileType.EXCEl
	if (image.includes(ext)) return FileType.IMAGE
	if (word.includes(ext)) return FileType.WORD
	if (audio.includes(ext)) return FileType.AUDIO
	if (video.includes(ext)) return FileType.VIDEO
	if (ppt.includes(ext)) return FileType.PPT
	return FileType.FILE
}
