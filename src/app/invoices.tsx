'use client';

import { type FormEvent, useEffect, useState } from 'react';

interface Invoice {
  id: number;
  number: string;
  customer: string;
  amountCents: number;
  issuedAt: string;
}

const api = process.env.NEXT_PUBLIC_API_URL;
const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const day = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: 'Europe/Paris' });

/** Factures : la liste, et un formulaire pour en émettre une. */
export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${api}/api/invoices`)
      .then((response) => response.json() as Promise<Invoice[]>)
      .then(setInvoices)
      .catch(() => setError("L'API ne répond pas : lancez facturation-api (make dev)."));
  }, []);

  const add = async (event: FormEvent) => {
    event.preventDefault();
    const amountCents = Math.round(Number(amount.replace(',', '.')) * 100);
    const response = await fetch(`${api}/api/invoices`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ customer, amountCents }),
    });
    if (!response.ok) return setError('Une facture a un client et un montant.');
    const invoice = (await response.json()) as Invoice;
    setInvoices((current) => [invoice, ...(current ?? [])]);
    setCustomer('');
    setAmount('');
    setError(null);
  };

  return (
    <section className="mt-8">
      <form onSubmit={(event) => void add(event)} className="flex gap-2">
        <label htmlFor="customer" className="sr-only">
          Client
        </label>
        <input
          id="customer"
          value={customer}
          onChange={(event) => setCustomer(event.target.value)}
          placeholder="Client"
          className="h-10 flex-1 rounded-md border border-zinc-300 bg-white px-3 outline-none focus:border-zinc-900"
        />
        <label htmlFor="amount" className="sr-only">
          Montant TTC en euros
        </label>
        <input
          id="amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Montant TTC (€)"
          inputMode="decimal"
          className="h-10 w-40 rounded-md border border-zinc-300 bg-white px-3 outline-none focus:border-zinc-900"
        />
        <button type="submit" className="h-10 rounded-md bg-zinc-900 px-4 font-medium text-white">
          Émettre
        </button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <table className="mt-6 w-full overflow-hidden rounded-md border border-zinc-200 bg-white text-left text-sm">
        <thead className="bg-zinc-100 text-zinc-600">
          <tr>
            <th className="px-4 py-2 font-medium">Numéro</th>
            <th className="px-4 py-2 font-medium">Client</th>
            <th className="px-4 py-2 text-right font-medium">Montant TTC</th>
            <th className="px-4 py-2 font-medium">Émise le</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200">
          {invoices === null && (
            <tr>
              <td colSpan={4} className="px-4 py-3 text-zinc-500">
                Chargement…
              </td>
            </tr>
          )}
          {invoices?.map((invoice) => (
            <tr key={invoice.id}>
              <td className="px-4 py-2 font-mono">{invoice.number}</td>
              <td className="px-4 py-2">{invoice.customer}</td>
              <td className="px-4 py-2 text-right">{euros.format(invoice.amountCents / 100)}</td>
              <td className="px-4 py-2">{day.format(new Date(invoice.issuedAt))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
