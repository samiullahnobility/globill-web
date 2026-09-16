import Link from 'next/link';
import { getSiteAssets } from '../lib/site-assets';
import type { PublicDoctor, PublicLocation, PublicPage, PublicService, PublicWebsite } from '../types/public';
import { AppointmentForm } from './appointment-form';

export function HomeSections({
  website,
  page,
  services,
  doctors,
  locations
}: {
  website: PublicWebsite;
  page?: PublicPage | null;
  services: PublicService[];
  doctors: PublicDoctor[];
  locations: PublicLocation[];
}) {
  const featuredLocation = locations[0];
  const assets = getSiteAssets(website);

  return (
    <main>
      <section className="hero">
        <div className="heroCopy">
          <span className="kicker">US-based healthcare operations</span>
          <h1>{page?.title ?? website.name}</h1>
          <p>{page?.content ?? 'A modern healthcare practice experience with clear services, trusted provider profiles, convenient location details, and secure appointment requests.'}</p>
          <div className="heroActions">
            <Link href="/contact">Request Appointment</Link>
            <Link href="/services">Explore Services</Link>
          </div>
          <div className="metrics">
            <strong>{services.length}+</strong><span>Services</span>
            <strong>{doctors.length}+</strong><span>Providers</span>
            <strong>{locations.length || 1}</strong><span>Location</span>
          </div>
        </div>
        <div className="dashboardCard">
          <img className="heroPhoto" src={assets.hero} alt={`${website.name} care environment`} />
          <span>CARE DASHBOARD</span>
          <h2>{website.name}</h2>
          <div className="heroScene" aria-hidden="true">
            <span className="sceneOrb" />
            <span className="sceneMark" />
            <span className="sceneLine" />
          </div>
          <div className="chartBars">{[34, 58, 44, 72, 66, 88].map((height, index) => <i key={index} style={{ height }} />)}</div>
          <ul>
            {services.slice(0, 3).map(service => <li key={service.id}><span>{service.name}</span><b>Available</b></li>)}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeaderWithImage">
          <div>
            <span className="kicker">What we do</span>
            <h2>Care services built around your patients</h2>
          </div>
          <img src={assets.services} alt={`${website.name} service setting`} />
        </div>
        <div className="serviceGrid">
          {services.slice(0, 6).map((service, index) => (
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
      </section>

      <section className="splitSection">
        <div>
          <span className="kicker">Provider team</span>
          <h2>Trusted clinicians and care specialists</h2>
          <p>Profiles are managed centrally in Globill, then rendered across each branded website.</p>
          <Link className="textLink" href="/providers">Meet the team</Link>
        </div>
        <div className="visualTeamPanel">
          <img src={assets.team} alt={`${website.name} provider environment`} />
          <div className="teamList overlayList">
            {doctors.slice(0, 4).map(doctor => (
              <article key={doctor.id}>
                <strong>{doctor.firstName} {doctor.lastName}</strong>
                <span>{doctor.credentials} {doctor.specialty}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ctaBand">
        <div>
          <span className="kicker">Request care</span>
          <h2>Send an appointment request</h2>
          <p>{featuredLocation ? `${featuredLocation.name}, ${featuredLocation.city}, ${featuredLocation.state}` : 'Choose a convenient time and our team will follow up.'}</p>
        </div>
        <AppointmentForm services={services} />
      </section>
    </main>
  );
}
