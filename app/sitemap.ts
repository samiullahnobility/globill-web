import type { MetadataRoute } from 'next';
import { absoluteUrl, getRequestHost, getServices } from '../lib/public-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = await getRequestHost();
  const services = await getServices(host);
  const staticPaths = ['/', '/about', '/services', '/providers', '/location', '/contact', '/privacy', '/terms'];

  return [
    ...staticPaths.map(path => ({ url: absoluteUrl(host, path), lastModified: new Date() })),
    ...services.map(service => ({ url: absoluteUrl(host, `/services/${service.slug}`), lastModified: new Date() }))
  ];
}
