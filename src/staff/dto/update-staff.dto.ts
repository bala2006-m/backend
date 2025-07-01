// src/staff/dto/update-staff.dto.ts
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  designation?: string;
}
