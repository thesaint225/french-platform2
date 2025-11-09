import fs from 'fs';
import path from 'path';

/**
 * Get the list of lessons inside /public/lessons
 * Each lesson file should be a .md or .txt file.
 */
export function getLessonList() {
  const lessonsDir = path.join(process.cwd(), 'public/lessons');

  // Check if the lessons directory exists to avoid runtime errors
  if (!fs.existsSync(lessonsDir)) {
    throw new Error(`The lessons directory was not found at: ${lessonsDir}`);
  }

  return fs
    .readdirSync(lessonsDir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.txt'))
    .map((file) => ({
      name: file.replace(/\.(md|txt)$/, ''), // remove extension
      path: `/lessons/${file.replace(/\.(md|txt)$/, '')}`, // URL-friendly path
    }));
}

/**
 * Read a single lesson content by name (without extension)
 * Example: getLessonContent('lesson1')
 */
export function getLessonContent(lessonName: string): string {
  const lessonPath = path.join(
    process.cwd(),
    'public/lessons',
    `${lessonName}.md`
  );

  if (!fs.existsSync(lessonPath)) {
    throw new Error(`Lesson "${lessonName}" not found in /public/lessons`);
  }

  return fs.readFileSync(lessonPath, 'utf-8');
}
