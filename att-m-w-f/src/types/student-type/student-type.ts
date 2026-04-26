export type StudentType = {
    id : number;
    name : string;
    age : number | null;
    phone : string | null;
    pPhone : string | null;
    email : string | null;
    memo : string | null;
    createdAt : string;
    updatedAt : string;
}

export type SummaryStudentType = {
    id : number;
    name : string;
    age : number;
    email : string;
    memo : string;
    phone : string;
    pPhone : string;
}
