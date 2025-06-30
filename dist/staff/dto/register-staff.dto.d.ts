import { Gender } from '@prisma/client';
export declare class RegisterStaffDto {
    username: string;
    designation: string;
    name: string;
    email: string;
    gender: Gender;
    mobile: string;
    school_id: string;
    password: string;
}
