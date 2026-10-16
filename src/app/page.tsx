import { Invoices } from './invoices';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Facturation</h1>
      <p className="mt-1 text-zinc-600">Les factures émises, et une nouvelle en deux champs.</p>
      <Invoices />
    </main>
  );
}
