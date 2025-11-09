import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

// // 🔹 This runs before your page renders
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ now we await it
  // Read the markdown file based on the slug
  const filePath = path.join(process.cwd(), 'app', 'contents', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  // Parse the front matter
  const { data } = matter(fileContent);
  // Return the metadata
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ now we await it

  const filePath = path.join(process.cwd(), 'app', 'contents', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { content, data } = matter(fileContent);

  return (
    <div className='max-w-2xl mx-auto py-10 px-6'>
      <h1 className='text-4xl font-bold mb-2'>{data.title}</h1>
      <p className='text-sm text-gray-500'>
        By {data.author} — {data.date}
      </p>

      <article className='prose prose-lg prose-slate'>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
}
