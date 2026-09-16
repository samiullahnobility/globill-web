import { notFound } from 'next/navigation';
import { SiteShell } from '../../components/site-shell';
import { getSiteData } from '../../lib/public-api';

export default async function PrivacyPage() {
  const { website } = await getSiteData('privacy');
  if (!website) notFound();
  return <SiteShell website={website}><main className="contentPage"><h1>Privacy Policy</h1><p>This website collects appointment request information only so the practice can respond. Do not submit clinical details through public forms.</p></main></SiteShell>;
}
