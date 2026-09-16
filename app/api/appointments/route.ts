import { NextResponse } from 'next/server';
import { getRequestHost } from '../../../lib/public-api';

const apiBaseUrl = process.env.GLOBILL_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:57172';

export async function POST(request: Request) {
  const host = await getRequestHost();
  const body = await request.json();
  const response = await fetch(`${apiBaseUrl}/api/public/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Globill-Host': host
    },
    body: JSON.stringify(body)
  });

  return NextResponse.json(await response.json().catch(() => ({})), { status: response.status });
}
