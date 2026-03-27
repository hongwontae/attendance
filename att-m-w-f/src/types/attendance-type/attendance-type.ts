type AttStatus = 'present' | 'late' | 'absent'

export type AttendanceType = {
    id : number;
    date : string;
    status : AttStatus;
    createdAt : string;
    updatedAt : string
}