import fs from 'fs';
import path from 'path';

import Markdown from 'markdown-to-jsx';
import { notFound } from 'next/navigation';
import React from 'react';

import { Link } from '@/components/Link';

const PrivacyPolicy = async ({ params }: { params: { pageSlug: string } }) => {
  const filePath = path.join(process.cwd(), 'markdown', `${params.pageSlug}.md`);
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return notFound();
  }

  return (
    <main className="my-10">
      <article className="prose  mx-auto max-w-6xl px-10 md:p-0">
        <Markdown
          options={{
            forceBlock: true,
            overrides: {
              a: {
                component: Link,
              },
            },
          }}
        >
          {content}
        </Markdown>
      </article>
    </main>
  );
};

export default PrivacyPolicy;
