import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../components/site-shell';
import { getSiteData } from '../../lib/public-api';
import { getSiteAssets } from '../../lib/site-assets';

export default async function ServicesPage() {
  const { website, services } = await getSiteData('services');
  if (!website) notFound();
  const assets = getSiteAssets(website);

  return (
    <SiteShell website={website}>
      <main className="contentPage">
        <div className="pageVisualIntro">
          <div>
            <span className="kicker">Services</span>
            <h1>Healthcare services</h1>
            <p className="pageIntro">Explore services managed from Globill and published to this website in real time.</p>
          </div>
          <img src={assets.services} alt={`${website.name} services`} />
        </div>
        <div className="serviceGrid">
          {services.map((service, index) => (
            <Link className="serviceCard" key={service.id} href={`/services/${service.slug}`}>
              <span className="iconBadge" aria-hidden="true">
                <span className="iconPulse" />
              </span>
              <span className="cardIndex">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.name}</h3>
              <p>{service.shortDescription ?? service.description ?? 'Learn more about this service.'}</p>
              <span className="cardAction">View Service</span>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
