export declare class CreateHolidayDto {
    date: string;
    reason: string;
    school_id: number;
    class_ids: number[];
    fn: 'H' | 'W';
    an: 'H' | 'W';
}
