import { Expose } from "class-transformer";

export class ResponseBasicInstructorDto {

    @Expose()
    id : number;

    @Expose()
    name : string;

    @Expose()
    phone : string | null;

    @Expose()
    email : string | null;


}