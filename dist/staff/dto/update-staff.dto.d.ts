export declare enum Gender {
    Male = "M",
    Female = "F",
    Other = "O"
}
export declare class UpdateStaffDto {
    name?: string;
    email?: string;
    mobile?: string;
    designation?: string;
    gender?: Gender;
}
