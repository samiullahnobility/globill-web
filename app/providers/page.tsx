import { notFound } from 'next/navigation';
import { SiteShell } from '../../components/site-shell';
import { getSiteData } from '../../lib/public-api';
import { getSiteAssets } from '../../lib/site-assets';

export default async function ProvidersPage() {
  const { website, doctors } = await getSiteData('providers');
  if (!website) notFound();
  const assets = getSiteAssets(website);

  return (
    <SiteShell website={website}>
      <main className="contentPage">
        <div className="pageVisualIntro">
          <div>
            <span className="kicker">Providers</span>
            <h1>Meet the care team</h1>
            <p className="pageIntro">Provider profiles are pulled from the CRM for the active website domain.</p>
          </div>
          <img src={assets.team} alt={`${website.name} care team`} />
        </div>
        <div className="providerGrid">
          {doctors.map(doctor => (
            <article className="providerCard" key={doctor.id}>
              <div className="avatar">{doctor.firstName.slice(0, 1)}{doctor.lastName.slice(0, 1)}</div>
              <div>
                <span className="roleBadge">Care Provider</span>
                <h3>{doctor.firstName} {doctor.lastName}</h3>
                <span>{doctor.credentials}</span>
                <p className="specialty">{doctor.specialty}</p>
                <p>{doctor.biography ?? 'Focused on practical, patient-centered care and clear communication.'}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
