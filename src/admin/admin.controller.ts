import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('fetch_admin-data')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async fetchAdminData(@Query('username') username?: string) {
    try {
      const data = await this.adminService.getAdmin(username);
      return {
        status: 'success',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
