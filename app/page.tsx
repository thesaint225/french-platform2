import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getLessonList } from '@/lib/getLessons';
export default function HomePage() {
  const lessons = getLessonList();

  return (
    <main className='max-w-2xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>French Learning Platform</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {lessons.map((lesson) => (
          <Link key={lesson.name} href={lesson.path} passHref>
            <Card className='hover:shadow-lg transition-shadow'>
              <CardContent>
                <h2 className='text-xl font-semibold'>{lesson.name}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
