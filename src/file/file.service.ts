import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
import * as PDFDocument from 'pdfkit'

@Injectable()
export class FileService {
    createImageFile(file): string {
        try {
            const extension = file.originalname.split('.').pop()
            const fileName = uuid.v4() + "." + extension
            const filePath = path.resolve(__dirname, '..', 'static', 'img')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return fileName
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createPdfFile(firstName, lastName, image): Promise<Buffer> {
        const filePath = path.resolve(__dirname, '..', 'static', 'pdf')
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true })
        }

        const pdfBuffer: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument({
                size: 'LETTER',
                bufferPages: true,
            })

            doc.text(`${firstName} ${lastName}`, 100, 50)
            doc.image(path.resolve(__dirname, '..', 'static', 'img', image), 100, 100)
            doc.end()

            const buffer = []
            doc.on('data', buffer.push.bind(buffer))
            doc.on('end', () => {
                const data = Buffer.concat(buffer)
                resolve(data)
            })
        })

        return pdfBuffer
    }

    deleteFile(fileName) {
        const filePath = path.resolve(__dirname, '..', 'static', 'img', fileName)
        fs.unlinkSync(filePath)
    }
}
