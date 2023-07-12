import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MyAuthGuard } from '../auth/auth.guard';
import { AccessGuard, UseAbility } from 'nest-casl';
import { SecurityActions } from '../../types';
import { Categories } from 'types/generated/categories';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(MyAuthGuard, AccessGuard)
  @UseAbility(SecurityActions.create, Categories)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  @Get('getCategory/getCategoriesForSearch')
  getCategoriesForSearch() {
    return this.categoriesService.findForSearch();
  }

  @Get('getCategory/getCategoryBySlug')
  postBySlug(@Query('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(MyAuthGuard, AccessGuard)
  @UseAbility(SecurityActions.update, Categories)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(MyAuthGuard, AccessGuard)
  @UseAbility(SecurityActions.delete, Categories)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
