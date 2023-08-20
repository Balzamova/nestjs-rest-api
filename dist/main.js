"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
function addSwaggerDoc(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nest.js rest api')
        .setDescription('test task')
        .setVersion('1.0.0')
        .addTag('nestjs')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    addSwaggerDoc(app);
    await app.listen(+process.env.PORT, () => console.log(`Server started on http://localhost:${+process.env.PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map