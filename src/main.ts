import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "./pipes/validation.pipe"

const start = async () => {
    try {
        const PORT = process.env.PORT || 8000
        const app = await NestFactory.create(AppModule)
        app.useGlobalPipes(new ValidationPipe())
        await app.listen(PORT, () => console.log(`Start on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()