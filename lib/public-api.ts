import { headers } from 'next/headers';
import type { PublicDoctor, PublicLocation, PublicPage, PublicService, PublicWebsite } from '../types/public';

const apiBaseUrl = process.env.GLOBILL_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'https://globill-api-production.up.railway.app';

export async function getRequestHost() {
  const headerStore = await headers();
  const previewHost = headerStore.get('x-globill-preview-host');

  if (previewHost) {
    return previewHost;
  }

  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host') ?? 'localhost';

  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return process.env.GLOBILL_PUBLIC_HOST ?? 'cedarridgefamilymedicine.local';
  }

  return host;
}

async function fetchPublic<T>(path: string, host?: string): Promise<T | null> {
  const resolvedHost = host ?? await getRequestHost();
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      headers: {
        'X-Globill-Host': resolvedHost
      },
      next: { revalidate: 60 }
    });
  } catch {
    return null;
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Public API request failed: ${path}`);
  }

  return response.json() as Promise<T>;
}

export function getWebsite(host?: string) {
  return fetchPublic<PublicWebsite>('/api/public/website', host);
}

export function getPage(slug: string, host?: string) {
  return fetchPublic<PublicPage>(`/api/public/pages/${slug}`, host);
}

export async function getServices(host?: string) {
  return (await fetchPublic<PublicService[]>('/api/public/services', host)) ?? [];
}

export async function getDoctors(host?: string) {
  return (await fetchPublic<PublicDoctor[]>('/api/public/doctors', host)) ?? [];
}

export async function getLocations(host?: string) {
  return (await fetchPublic<PublicLocation[]>('/api/public/locations', host)) ?? [];
}

export async function getSiteData(slug = 'home') {
  const host = await getRequestHost();
  const [website, page, services, doctors, locations] = await Promise.all([
    getWebsite(host),
    getPage(slug, host),
    getServices(host),
    getDoctors(host),
    getLocations(host)
  ]);

  return { host, website, page, services, doctors, locations };
}

export function absoluteUrl(host: string, path = '/') {
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}${path}`;
}
