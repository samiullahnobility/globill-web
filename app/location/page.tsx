import { notFound } from 'next/navigation';
import { SiteShell } from '../../components/site-shell';
import { getSiteData } from '../../lib/public-api';
import { getSiteAssets } from '../../lib/site-assets';

export default async function LocationPage() {
  const { website, locations } = await getSiteData('location');
  if (!website) notFound();
  const assets = getSiteAssets(website);

  return (
    <SiteShell website={website}>
      <main className="contentPage">
        <div className="pageVisualIntro">
          <div>
            <span className="kicker">Location</span>
            <h1>Visit us</h1>
            <p className="pageIntro">Location and contact details are resolved from the current provider and website.</p>
          </div>
          <img src={assets.hero} alt={`${website.name} location`} />
        </div>
        <div className="locationGrid">
          {locations.map(location => (
            <article className="locationCard polishedLocation" key={location.id}>
              <div className="mapPanel">
                <span>MAP</span>
                <strong>{location.city}</strong>
              </div>
              <div>
                <h3>{location.name}</h3>
                <p>{location.addressLine1}<br />{location.addressLine2 ? <>{location.addressLine2}<br /></> : null}{location.city}, {location.state} {location.zipCode}</p>
                <div className="contactChips">
                  {location.phone ? <span><i className="miniIcon phoneIcon" aria-hidden="true" />{location.phone}</span> : null}
                  {location.email ? <span><i className="miniIcon mailIcon" aria-hidden="true" />{location.email}</span> : null}
                </div>
                <p className="hours">{location.businessHours}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
