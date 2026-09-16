import { notFound } from 'next/navigation';
import { SiteShell } from '../../components/site-shell';
import { getSiteData } from '../../lib/public-api';

export default async function TermsPage() {
  const { website } = await getSiteData('terms');
  if (!website) notFound();
  return <SiteShell website={website}><main className="contentPage"><h1>Terms of Use</h1><p>Website content is informational and does not replace professional medical advice. Contact the practice directly for care decisions.</p></main></SiteShell>;
}
