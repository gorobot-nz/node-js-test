import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
import * as pdf from 'pdfkit'

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

    createPdfFile(firstName, lastName, image) {
        const filePath = path.resolve(__dirname, '..', 'static', 'pdf')
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true })
        }
        const fileName = uuid.v4() + ".pdf"

        let pdfDoc = new pdf
        pdfDoc.pipe(fs.createWriteStream(path.resolve(filePath, fileName)))
        pdfDoc.text(`Name: ${firstName} Surname:${lastName}`)

        const imagePath = path.resolve(__dirname, '..', 'static', 'img', image)
        pdf.image(imagePath, { fit: [250, 250] })
        pdf.end()
    }

    deleteFile(fileName) {

    }
}
