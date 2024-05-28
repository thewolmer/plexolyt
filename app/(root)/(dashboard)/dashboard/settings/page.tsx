import React from 'react';

import { Header } from '@/components/Layout';

import { ReleasesMarkdown } from './components/CommitsHistory';

const SettingsPage = () => (
  <div>
    <Header title="Settings" description="Manage your store preferences" />
    <section className="mx-auto max-w-6xl p-10 md:p-0">
      <ReleasesMarkdown />
    </section>
  </div>
);

export default SettingsPage;
