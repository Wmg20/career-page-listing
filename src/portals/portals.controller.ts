import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PortalsService } from './portals.service';

@Controller('portals')
export class PortalsController {
  constructor(private readonly portalsService: PortalsService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.portalsService.getPortals({ search, page, limit });
  }

  @Get('suggest')
  getSuggestions(@Query('q') q: string): string[] {
    return this.portalsService.getSuggestions(q);
  }

  @Post('sync')
  async sync(): Promise<{ success: boolean; count: number }> {
    return this.portalsService.syncWithRemote();
  }

  @Post('favorite')
  async toggleFavorite(@Body() body: { title: string; isFavorite: boolean }) {
    return this.portalsService.toggleFavorite(body.title, body.isFavorite);
  }
}
