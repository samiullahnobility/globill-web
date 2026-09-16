import { notFound } from 'next/navigation';
import { AppointmentForm } from '../../components/appointment-form';
import { SiteShell } from '../../components/site-shell';
import { getSiteData } from '../../lib/public-api';
import { getSiteAssets } from '../../lib/site-assets';

export default async function ContactPage() {
  const { website, services, locations } = await getSiteData('contact');
  if (!website) notFound();
  const assets = getSiteAssets(website);

  return (
    <SiteShell website={website}>
      <main className="ctaBand">
        <div className="contactVisual">
          <img src={assets.hero} alt={`${website.name} clinic`} />
          <span className="kicker">Contact</span>
          <h1>Request an appointment</h1>
          <p>{locations[0] ? `${locations[0].name}: ${locations[0].phone ?? ''}` : 'Send a request and the team will follow up.'}</p>
        </div>
        <AppointmentForm services={services} />
      </main>
    </SiteShell>
  );
}
