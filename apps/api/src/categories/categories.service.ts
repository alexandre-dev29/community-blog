import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class CategoriesService {
  constructor(
    private prismaService: PrismaService,
    private utilityService: UtilityService,
  ) {}

  async create({
    categoryName,
    categoryDescription,
    mainImageUrl,
  }: CreateCategoryDto) {
    const foundedCategory = await this.prismaService.categories.findFirst({
      where: { categoryName: categoryName },
    });
    if (foundedCategory) {
      throw new HttpException(
        'This category already exist',
        HttpStatus.FORBIDDEN,
      );
    }

    let slug = this.utilityService.generateSlug(categoryName);

    let slugExists = await this.prismaService.categories.findUnique({
      where: { categorySlug: slug },
      select: { id: true },
    });

    while (slugExists) {
      slug = this.utilityService.generateSlug(categoryName);
      slugExists = await this.prismaService.posts.findUnique({
        where: { postSlug: slug },
        select: { id: true },
      });
    }
    return this.prismaService.categories.create({
      data: {
        categoryDescription,
        categoryName,
        categorySlug: slug,
        mainImageUrl,
      },
    });
  }

  findAll() {
    return this.prismaService.categories.findMany({ include: { posts: true } });
  }

  findOne(id: string) {
    return this.prismaService.categories.findUnique({ where: { id: id } });
  }

  update(
    id: string,
    {
      categoryName,

      categoryDescription,
      mainImageUrl,
    }: UpdateCategoryDto,
  ) {
    return this.prismaService.categories.update({
      where: { id },
      data: { categoryDescription, categoryName, mainImageUrl },
    });
  }

  remove(id: string) {
    return this.prismaService.categories.delete({ where: { id: id } });
  }

  findBySlug(slug: string) {
    return this.prismaService.categories.findUnique({
      where: { categorySlug: slug },
      include: { posts: { include: { author: true } } },
    });
  }

  findForSearch() {
    return this.prismaService.categories.findMany({
      select: { categoryName: true, categorySlug: true },
    });
  }
}
