import { Gender } from '@prisma/client';
export declare class UpdateStaffDto {
    name?: string;
    email?: string;
    gender: Gender;
    mobile?: string;
    school_id?: string;
}
