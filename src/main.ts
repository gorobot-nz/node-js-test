import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from "./pipes/validation.pipe"

const start = async () => {
    try {
        const PORT = process.env.PORT || 8000
        const app = await NestFactory.create(AppModule)

        const config = new DocumentBuilder()
            .setTitle('Node.Js test API')
            .setDescription('Docs')
            .setVersion('0.1.0')
            .addBearerAuth(
                {
                    description: 'Default JWT Authorization',
                    type: 'http',
                    in: 'header',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                'defaultBearerAuth',
            )
            .build()

        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('/docs', app, document)

        app.useGlobalPipes(new ValidationPipe())
        await app.listen(PORT, () => console.log(`Start on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()