import { PartialType } from "@nestjs/mapped-types";
import { CreateAttDto } from "./CreateAtt.dto";

export class UpdateAttDto extends PartialType(CreateAttDto){}