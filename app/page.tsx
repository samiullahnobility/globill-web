import { notFound } from 'next/navigation';
import { HomeSections } from '../components/home-sections';
import { SiteShell } from '../components/site-shell';
import { absoluteUrl, getSiteData } from '../lib/public-api';

export async function generateMetadata() {
  const { host, website, page } = await getSiteData('home');

  return {
    title: page?.metaTitle ?? website?.name ?? 'Healthcare Website',
    description: page?.metaDescription ?? page?.content ?? 'Healthcare services and appointment requests.',
    alternates: { canonical: page?.canonicalUrl ?? absoluteUrl(host, '/') },
    openGraph: {
      title: page?.metaTitle ?? website?.name ?? 'Healthcare Website',
      description: page?.metaDescription ?? page?.content ?? 'Healthcare services and appointment requests.',
      url: absoluteUrl(host, '/')
    }
  };
}

export default async function HomePage() {
  const { website, page, services, doctors, locations } = await getSiteData('home');

  if (!website) {
    notFound();
  }

  return (
    <SiteShell website={website}>
      <HomeSections website={website} page={page} services={services} doctors={doctors} locations={locations} />
    </SiteShell>
  );
}
