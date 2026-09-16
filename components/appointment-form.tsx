'use client';

import { useState } from 'react';

export function AppointmentForm({ services }: { services: { id: number; name: string }[] }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(formData: FormData) {
    setState('sending');
    const body = Object.fromEntries(formData.entries());
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        serviceId: body.serviceId ? Number(body.serviceId) : null
      })
    });

    setState(response.ok ? 'sent' : 'error');
  }

  return (
    <form className="appointmentForm" action={submit}>
      <div className="twoCol">
        <label>First Name<input name="firstName" required /></label>
        <label>Last Name<input name="lastName" required /></label>
      </div>
      <div className="twoCol">
        <label>Email<input name="email" type="email" required /></label>
        <label>Phone<input name="phone" required /></label>
      </div>
      <div className="twoCol">
        <label>Preferred Date<input name="preferredDate" type="date" /></label>
        <label>Preferred Time<input name="preferredTime" type="time" /></label>
      </div>
      <label>Service
        <select name="serviceId">
          <option value="">Any service</option>
          {services.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}
        </select>
      </label>
      <label>Message<textarea name="message" rows={4} /></label>
      <button disabled={state === 'sending'}>{state === 'sending' ? 'Sending...' : 'Request Appointment'}</button>
      {state === 'sent' && <p className="success">Thank you. Your request was received.</p>}
      {state === 'error' && <p className="error">Something went wrong. Please try again.</p>}
    </form>
  );
}
