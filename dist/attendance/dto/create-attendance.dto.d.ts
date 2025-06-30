export declare class CreateAttendanceDto {
    username: string;
    date: string;
    session: 'FN' | 'AN';
    status: 'P' | 'A';
    school_id: string;
    class_id: string;
}
