import { Link } from 'react-router-dom';
import { PageShell } from '@/components/PageShell';
import { QuickContact } from '@/components/QuickContact';
import { Card } from '@/components/ui/Card';
export function ConsultContact() {
  return <PageShell product="consult"><main className="mx-auto max-w-5xl px-6 py-16">
    <p className="font-bold text-orange-600">IHLink Consult</p><h1 className="mt-2 text-4xl font-black">Contact the Consult team</h1>
    <p className="mt-3 max-w-2xl text-muted">Discuss software, AI, cloud and engineering work directly with IHLink Consult.</p>
    <QuickContact className="mt-8"/>
    <div className="mt-8 grid gap-4 sm:grid-cols-2"><Card><h2 className="font-bold">Start a new project</h2><p className="mt-2 text-sm text-muted">Share your requirements for a scoped quotation.</p><Link className="mt-4 inline-block font-bold text-orange-700" to="/consult/quote">Request a quote →</Link></Card><Card><h2 className="font-bold">Existing project support</h2><p className="mt-2 text-sm text-muted">Create a Consult support ticket tied to your IHLink account.</p><Link className="mt-4 inline-block font-bold text-orange-700" to="/consult/support">Open support →</Link></Card></div>
  </main></PageShell>;
}
