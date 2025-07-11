export declare enum Gender {
    M = "M",
    F = "F",
    O = "O"
}
export declare class RegisterStudentDto {
    username: string;
    name: string;
    gender: Gender;
    email: string;
    mobile: string;
    class_id: string;
    school_id: string;
}
