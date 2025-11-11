import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function lessonListPage() {
  const lessonsDir = path.join(process.cwd(), 'app', 'contents');
  const files = fs.readdirSync(lessonsDir);
  const lessons = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(lessonsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug: file.replace('.mdx', ''),
        title: data.title || 'Untitled Lesson',
        description: data.description || '',
      };
    });
  return (
    <div className='max-w-3xl mx-auto py-10 px-6'>
      <h1 className='text-4xl font-bold mb-8'>All Lessons</h1>
      <ul className='space-y-4'>
        {lessons.map((lesson) => (
          <li key={lesson.slug} className='p-4 border rounded hover:bg-gray-50'>
            <Link
              href={`/lessons/${lesson.slug}`}
              className='text-lg font-semibold text-blue-600'
            >
              {lesson.title}
            </Link>
            <p className='text-sm text-gray-500'>{lesson.description} —</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
