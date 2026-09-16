import { notFound } from 'next/navigation';
import { SiteShell } from '../../components/site-shell';
import { getSiteData } from '../../lib/public-api';

export default async function AboutPage() {
  const { website, page, doctors } = await getSiteData('about');
  if (!website) notFound();

  return (
    <SiteShell website={website}>
      <main className="contentPage">
        <span className="kicker">About us</span>
        <h1>{page?.title ?? `About ${website.name}`}</h1>
        <p>{page?.content ?? 'Our practice combines patient-centered care with modern operations, clear communication, and convenient appointment access.'}</p>
        <div className="teamList">
          {doctors.map(doctor => <article key={doctor.id}><strong>{doctor.firstName} {doctor.lastName}</strong><span>{doctor.specialty}</span></article>)}
        </div>
      </main>
    </SiteShell>
  );
}
