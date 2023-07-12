import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserSecurity } from '../../types';
import { UtilityService } from '../utility/utility.service';
import { PrismaService } from '../prisma/prisma.service';
import { SetPublishedDto } from './dto/setPublished.dto';
import { Role } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const readingTime = require('reading-time');

@Injectable()
export class PostsService {
  constructor(
    private utilityService: UtilityService,
    private prismaService: PrismaService,
  ) {}

  async create(
    {
      postTitle,
      postDescription,
      postContent,
      postMainImage,
      categoryId,
    }: CreatePostDto,
    currentUser: UserSecurity,
  ) {
    let slug = this.utilityService.generateSlug(postTitle);

    let slugExists = await this.prismaService.posts.findUnique({
      where: { postSlug: slug },
      select: { id: true },
    });
    while (slugExists) {
      slug = this.utilityService.generateSlug(postTitle);
      slugExists = await this.prismaService.posts.findUnique({
        where: { postSlug: slug },
        select: { id: true },
      });
    }
    const read = readingTime(postContent);

    return this.prismaService.posts.create({
      data: {
        postSlug: slug,
        postMainImage,
        postTitle,
        postContent,
        postDescription,
        categoryId,
        authorId: currentUser.id,
        postReadTime: Math.round(read.minutes),
        isFeatured: false,
        isPublished: false,
        postViewCount: 0,
      },
    });
  }
  exclude<Posts, Key extends keyof Posts>(
    posts: Posts,
    keys: Key[],
  ): Omit<Posts, Key> {
    for (const key of keys) {
      delete posts[key];
    }
    return posts;
  }
  async findAll() {
    const allPosts = await this.prismaService.posts.findMany({
      include: { author: true, Category: true },
      where: { isPublished: true },
    });
    const transformed = allPosts.map((value) => {
      const author = value.author;
      author.password = '';
      author.refreshToken = '';
      return { ...value, author: author };
    });
    return transformed;
  }

  findBySlug(postSlug: string) {
    return this.prismaService.posts.findUnique({
      include: { author: true, Category: true },
      where: { postSlug },
    });
  }
  async findBySlugForMetaData(postSlug: string) {
    const currentPost = await this.prismaService.posts.findUnique({
      include: { author: true },
      where: { postSlug },
    });
    return this.exclude(currentPost, ['postContent']);
  }

  findAllByConnected(currentUser: UserSecurity) {
    return currentUser.roles[0] === Role.Admin
      ? this.prismaService.posts.findMany({
          include: { author: true, Category: true },
        })
      : this.prismaService.posts.findMany({
          where: { authorId: currentUser.id },
        });
  }

  findOne(id: string) {
    return this.prismaService.posts.findUnique({ where: { id: id } });
  }

  update(
    id: string,
    {
      postTitle,
      postDescription,
      postContent,
      postMainImage,
      categoryId,
      Tags,
    }: UpdatePostDto,
  ) {
    const read = readingTime(postContent);
    return this.prismaService.posts.update({
      where: { id },
      data: {
        postTitle,
        postDescription,
        postContent,
        postReadTime: Math.round(read.minutes),
        postMainImage,
        Tags: Tags,
        categoryId,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  updatePublishStatus({ isPublished, id }: SetPublishedDto) {
    return this.prismaService.posts.update({
      where: { id },
      data: { isPublished, publishedAt: new Date() },
    });
  }

  findForSearch() {
    return this.prismaService.posts.findMany({
      select: { postTitle: true, postSlug: true },
    });
  }

  async AddPostShareBySlug(slug: string) {
    const currentPost = await this.prismaService.posts.findUnique({
      where: { postSlug: slug },
    });
    try {
      await this.prismaService.posts.update({
        where: { id: currentPost.id },
        data: { postTotalShares: currentPost.postTotalShares + 1 },
      });
      return true;
    } catch (error) {
      throw new Error('There was an error while trying to add share');
    }
  }
}
