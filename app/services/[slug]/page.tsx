import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/site-shell';
import { getRequestHost, getServices, getWebsite } from '../../../lib/public-api';

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const host = await getRequestHost();
  const [website, services] = await Promise.all([getWebsite(host), getServices(host)]);
  const service = services.find(item => item.slug === slug);
  if (!website || !service) notFound();

  return (
    <SiteShell website={website}>
      <main className="contentPage">
        <span className="kicker">Service</span>
        <h1>{service.name}</h1>
        <p>{service.description ?? service.shortDescription ?? 'Details for this service are coming soon.'}</p>
      </main>
    </SiteShell>
  );
}
