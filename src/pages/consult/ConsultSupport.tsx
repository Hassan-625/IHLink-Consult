import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/Card";
import { SupportTicketForm } from "@/components/SupportTicketForm";
import { QuickContact } from "@/components/QuickContact";
import { Headphones, Clock, ShieldCheck } from "lucide-react";

export function ConsultSupport() {
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
                accentClass="bg-gradient-to-r from-orange-500 to-pink-600"
              />
            </Card>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
