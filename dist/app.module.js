"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const products_module_1 = require("./products/products.module");
const users_module_1 = require("./users/users.module");
const users_model_1 = require("./users/users.model");
const roles_module_1 = require("./roles/roles.module");
const roles_model_1 = require("./roles/roles.model");
const user_roles_model_1 = require("./roles/user-roles.model");
const auth_module_1 = require("./auth/auth.module");
const posts_model_1 = require("./posts/posts.model");
const posts_module_1 = require("./posts/posts.module");
const files_module_1 = require("./files/files.module");
const path = require("path");
const serve_static_1 = require("@nestjs/serve-static");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: +process.env.POSTGRES_PORT,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [users_model_1.User, roles_model_1.Role, user_roles_model_1.UserRoles, posts_model_1.Post],
                autoLoadModels: true
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.resolve(__dirname, 'static'),
            }),
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            files_module_1.FilesModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map