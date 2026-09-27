import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/Card";
import { SupportTicketForm } from "@/components/SupportTicketForm";
import { QuickContact } from "@/components/QuickContact";
import { Headphones, Clock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export function ConsultSupport() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Array<{ id: string; ticket_number: string; subject: string; status: string; created_at: string }>>([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (!supabase || !user) return;
    void supabase.from('support_tickets').select('id,ticket_number,subject,status,created_at').eq('product', 'consult').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20)
      .then(({ data, error: failure }) => { setTickets(data || []); setError(failure?.message || ''); });
  }, [user, refresh]);
  return (
    <PageShell product="consult">
      <main className="bg-gradient-to-br from-orange-50 to-purple-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Headphones className="mx-auto h-12 w-12 text-orange-600" />
            <h1 className="mt-4 text-4xl font-black">
              Consult project support
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted">
              Request technical assistance for software, AI, cloud, remote work
              or an active consulting engagement.
            </p>
          </div>
          <QuickContact className="mt-8" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <Card>
              <h2 className="font-bold">Service commitment</h2>
              <div className="mt-5 space-y-5 text-sm text-muted">
                <p className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-orange-600" />
                  Support requests are reviewed according to the active engagement, severity and agreed support terms.
                </p>
                <p className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-orange-600" />
                  Ticket access is controlled through authenticated account and administrative access policies.
                </p>
              </div>
            </Card>
            <Card>
              <h2 className="mb-4 text-lg font-bold">Open a support ticket</h2>
              <SupportTicketForm
                product="consult"
                onCreated={() => setRefresh(value => value + 1)}
                accentClass="bg-gradient-to-r from-orange-500 to-pink-600"
              />
            </Card>
          </div>
          {user && <Card className="mt-6"><h2 className="font-bold">Your Consult tickets</h2>{error && <p role="alert" className="mt-3 text-sm text-rose-700">{error}</p>}<div className="mt-3 divide-y">{tickets.map(ticket => <div key={ticket.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><div><b>{ticket.subject}</b><p className="text-muted">{ticket.ticket_number} · {new Date(ticket.created_at).toLocaleDateString('en-NG')}</p></div><span className="font-bold capitalize text-orange-700">{ticket.status.replaceAll('_', ' ')}</span></div>)}{!tickets.length && !error && <p className="py-3 text-sm text-muted">No Consult tickets yet.</p>}</div></Card>}
        </div>
      </main>
    </PageShell>
  );
}
