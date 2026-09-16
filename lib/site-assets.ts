import type { PublicWebsite } from '../types/public';

export type SiteAssetSet = {
  hero: string;
  services: string;
  team: string;
};

const assetSets: Record<string, SiteAssetSet> = {
  'primary-care': {
    hero: '/site-images/primary-care/hero.png',
    services: '/site-images/primary-care/services.png',
    team: '/site-images/primary-care/team.png'
  },
  dental: {
    hero: '/site-images/dental/hero.png',
    services: '/site-images/dental/services.png',
    team: '/site-images/dental/team.png'
  },
  'physical-therapy': {
    hero: '/site-images/physical-therapy/hero.png',
    services: '/site-images/physical-therapy/services.png',
    team: '/site-images/physical-therapy/team.png'
  }
};

export function getSiteAssets(website: Pick<PublicWebsite, 'template'>): SiteAssetSet {
  const template = (website.template ?? '').toLowerCase();
  return assetSets[template] ?? assetSets['primary-care'];
}
