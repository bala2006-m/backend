import { Gender } from '@prisma/client';
export declare class RegisterStudentDto {
    username: string;
    name: string;
    email: string;
    gender: Gender;
    mobile: string;
    class_id: number;
    school_id: number;
    password: string;
}
