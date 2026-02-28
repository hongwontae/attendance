import { PartialType } from "@nestjs/mapped-types";
import { CreateAttDto } from "./create-att.dto";

export class UpdateAttDto extends PartialType(CreateAttDto){}