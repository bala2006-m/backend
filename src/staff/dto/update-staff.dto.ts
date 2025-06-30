import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Gender } from '@prisma/client';

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  gender: Gender;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  school_id?: string;
}
