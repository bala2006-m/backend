import { Gender } from '@prisma/client';
export declare class RegisterStaffDto {
    id: number;
    username: string;
    designation: string;
    name: string;
    email: string;
    gender: Gender;
    mobile: string;
    school_id: number;
    password: string;
}
