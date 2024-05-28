'use client';
import { formatDate, formatDistance } from 'date-fns';
import { CalendarIcon, GitCommitVerticalIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getCommits } from '@/actions/commits';
import { Link } from '@/components/Link';
import { Skeleton } from '@/components/ui/skeleton';
import { ToolTip } from '@/components/ui/ToolTip';

import { CommitsType } from '@/types/githubCommits';

export const ReleasesMarkdown = () => {
  const [commits, setCommits] = useState<CommitsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const data = await getCommits();
        setCommits(data.data);
      } catch (error) {
        toast.error('Failed to fetch commits');
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl py-12 md:py-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Changelog</h1>
          <p className="text-muted-foreground">View the latest updates and improvements on this project.</p>
        </div>
        {!loading ? (
          <>
            {commits.map((commit) => (
              <div key={commit.node_id} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex w-full flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row">
                    <div className="flex w-full items-center justify-start gap-1 md:w-fit">
                      <UserIcon className="h-4 w-4" />
                      <span>{commit.commit.committer.name}</span> | <span>{commit.commit.committer.email}</span>
                    </div>
                    <div className="flex w-full items-center justify-start gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <ToolTip content={formatDate(commit.commit.author.date, 'PPpp')}>
                        <span className="capitalize">
                          {formatDistance(commit.commit.author.date, new Date(), { addSuffix: true })}
                        </span>
                      </ToolTip>
                      <Link className="underline underline-offset-4 " href={commit.html_url}>
                        View commit
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <GitCommitVerticalIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm">{commit.commit.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          [...Array(7)].map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-2">
                <div className="flex w-full flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row">
                  <div className="flex w-full items-center justify-start gap-1 md:w-fit">
                    <UserIcon className="h-4 w-4" />
                    <Skeleton className="px-11 py-2"></Skeleton> | <Skeleton className="px-11 py-2"></Skeleton>
                  </div>
                  <div className="flex w-full items-center justify-start gap-1">
                    <CalendarIcon className="w- h-4" />
                    <Skeleton className="px-11 py-2"></Skeleton>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <GitCommitVerticalIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="w-full space-y-2">
                    <div className="w-full">
                      <Skeleton className="w-full py-2"></Skeleton>
                    </div>
                    <div className="flex w-full space-x-2">
                      <Skeleton className="w-1/4 py-2"></Skeleton>
                      <Skeleton className="w-full py-2"></Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
