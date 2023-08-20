import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ValidationExeption } from "src/exeptions/validation.exeption";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if(errors.length) {
            const messages = errors.map(err => this.getMessagesList(err));
            throw new ValidationExeption(messages);
        }

        return value;
    }

    private getMessagesList(err: ValidationError): string {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`
    }
}