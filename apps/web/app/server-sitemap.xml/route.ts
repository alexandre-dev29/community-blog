import {API_URL, axiosInstance, IPost} from '@community-blog/refine-config';
import {getServerSideSitemap} from 'next-sitemap';

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const allPosts = await axiosInstance.get<IPost[]>(`${API_URL}/posts`);

  const fields = allPosts.data.map((values) => {
    return {
      loc: `${process.env.SITE_URL || 'http://localhost:3000'}/post/${
        values.postSlug
      }`,
      lastmod: new Date().toISOString(),
    };
  });

  return getServerSideSitemap([...fields]);
}
