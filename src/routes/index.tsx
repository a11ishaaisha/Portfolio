
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { portfolioContent } from '@/lib/portfolio-content';
import { portfolioAssets } from '@/lib/portfolio-assets';
import { initializePortfolio } from '@/lib/portfolio-runtime';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Aisha Firdouse — Portfolio' },
      { name: 'description', content: "Branding, campaigns and video, built with a marketer's eye." },
      { property: 'og:title', content: 'Aisha Firdouse — Portfolio' },
      { property: 'og:description', content: "Branding, campaigns and video, built with a marketer's eye." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const root = useRef<HTMLDivElement>(null);

  // Google Analytics
  useEffect(() => {
    const measurementId = 'G-B53KESLW3W'; // Replace with your real ID

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    const w = window as any;
    w.dataLayer = w.dataLayer || [];

    function gtag(...args: any[]) {
      w.dataLayer.push(arguments);
    }

    w.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (!root.current) return;

    const cleanup = initializePortfolio(root.current, portfolioAssets);
    root.current.classList.add('portfolio-ready');

    return cleanup;
  }, []);

  return (
    <div
      ref={root}
      dangerouslySetInnerHTML={{ __html: portfolioContent }}
    />
  );
}
