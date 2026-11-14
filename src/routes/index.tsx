
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { portfolioContent } from '@/lib/portfolio-content';
import { portfolioAssets } from '@/lib/portfolio-assets';
import { initializePortfolio } from '@/lib/portfolio-runtime';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Aisha Firdouse — Portfolio' },
      {
        name: 'description',
        content: "Branding, campaigns and video, built with a marketer's eye.",
      },
      { property: 'og:title', content: 'Aisha Firdouse — Portfolio' },
      {
        property: 'og:description',
        content: "Branding, campaigns and video, built with a marketer's eye.",
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const root = useRef<HTMLDivElement>(null);

  // Google Analytics 4
  useEffect(() => {
    const measurementId = 'G-B53KESLW3W'; // Insert your actual GA4 ID

    if (document.querySelector('#google-analytics-script')) return;

    const script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId);
  }, []);

  // Portfolio initialization
  useEffect(() => {
    if (!root.current) return;

    const cleanup = initializePortfolio(
      root.current,
      portfolioAssets
    );

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
