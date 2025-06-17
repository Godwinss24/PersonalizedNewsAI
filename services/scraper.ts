// import cheerio from 'cheerio';
import { load } from 'cheerio';

export async function extractBBCArticle(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = load(html);

    const articleText: string[] = [];

    $('[data-component="text-block"]').each((_, el) => {
      const paragraph = $(el).text().trim();
      if (paragraph) articleText.push(paragraph);
    });

    const fullArticle = articleText.join('\n\n');

    // console.log('Extracted Article:\n', fullArticle);
    return fullArticle;
  } catch (err: any) {
    console.error('Error fetching article:', err.message);
    return null;
  }
}

