export interface PublicWebsite {
  id: number;
  providerId: number;
  name: string;
  domain: string;
  template?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface PublicPage {
  id: number;
  websiteId: number;
  title: string;
  slug: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  status: string;
  displayOrder: number;
}

export interface PublicService {
  id: number;
  websiteId: number;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface PublicDoctor {
  id: number;
  websiteId: number;
  firstName: string;
  lastName: string;
  credentials?: string;
  specialty?: string;
  biography?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface PublicLocation {
  id: number;
  providerId: number;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  email?: string;
  businessHours?: string;
  isActive: boolean;
}
