import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

type LessonPageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const filePath = path.join(process.cwd(), 'app', 'contents', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const filePath = path.join(process.cwd(), 'app', 'contents', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { content, data } = matter(fileContent);

  // ✅ Use remark-gfm to support tables, strikethrough, and checklists
  const processedContent = await remark().use(gfm).use(html).process(content);

  return (
    <div className='max-w-2xl mx-auto py-10 px-6'>
      <h1 className='text-4xl font-bold mb-2'>{data.title}</h1>
      <p className='text-sm text-gray-500'>
        By {data.author} — {data.date}
      </p>

      <article className='prose prose-lg prose-slate mt-6'>
        <div
          dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
        />
      </article>
    </div>
  );
}
