import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageShell } from '@/components/PageShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

type Details = { first_name: string; middle_name: string; last_name: string; phone: string; sex: string; newsletter_opt_in: boolean };
const empty: Details = { first_name: '', middle_name: '', last_name: '', phone: '', sex: '', newsletter_opt_in: false };
const field = 'mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-orange-500 focus:outline-none';

export function ConsultAccount() {
  const { user } = useAuth();
  const settings = useLocation().pathname.endsWith('/settings');
  const [details, setDetails] = useState<Details>(empty);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [appearance, setAppearance] = useState<'light'|'system'|'dark'>(() => (localStorage.getItem('ihlink-appearance') as 'light'|'system'|'dark') || 'system');
  useEffect(() => { document.documentElement.dataset.appearance = appearance; localStorage.setItem('ihlink-appearance', appearance); }, [appearance]);
  useEffect(() => {
    if (!supabase || !user) return;
    void supabase.from('profiles').select('first_name,middle_name,last_name,phone,sex,newsletter_opt_in').eq('id', user.id).single()
      .then(({ data, error }) => error ? setNotice(error.message) : setDetails({ ...empty, ...data } as Details));
  }, [user]);
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !user) return;
    setBusy(true);
    const { data, error } = await supabase.from('profiles').update(details).eq('id', user.id).select('id').maybeSingle();
    setBusy(false);
    setNotice(error?.message || (!data ? 'Your profile was not updated. Reload and try again.' : 'Consult account settings saved.'));
  }
  return <PageShell product="consult"><main className="mx-auto max-w-4xl px-6 py-12">
    <p className="font-bold text-orange-600">IHLink Consult</p>
    <h1 className="mt-2 text-3xl font-black">{settings ? 'Account settings' : 'My profile'}</h1>
    <nav className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-orange-700">
      <Link to="/consult/profile">Profile</Link><Link to="/consult/settings">Settings</Link>
      <Link to="/consult/notifications">Notifications</Link><Link to="/consult/portal">Client portal</Link>
    </nav>
    {notice && <p role="status" className="mt-5 rounded-xl border bg-white p-3 text-sm">{notice}</p>}
    <Card className="mt-6"><form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-bold">First name<input required className={field} value={details.first_name || ''} onChange={e => setDetails({ ...details, first_name: e.target.value })}/></label>
      <label className="text-sm font-bold">Middle name<input className={field} value={details.middle_name || ''} onChange={e => setDetails({ ...details, middle_name: e.target.value })}/></label>
      <label className="text-sm font-bold">Last name<input required className={field} value={details.last_name || ''} onChange={e => setDetails({ ...details, last_name: e.target.value })}/></label>
      <label className="text-sm font-bold">Phone<input type="tel" className={field} value={details.phone || ''} onChange={e => setDetails({ ...details, phone: e.target.value })}/></label>
      <label className="text-sm font-bold">Sex<select className={field} value={details.sex || ''} onChange={e => setDetails({ ...details, sex: e.target.value })}><option value="">Prefer not to say</option><option value="male">Male</option><option value="female">Female</option></select></label>
      <label className="text-sm font-bold">Email<input className={field} value={user?.email || ''} readOnly aria-label="Email address"/></label>
      <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={Boolean(details.newsletter_opt_in)} onChange={e => setDetails({ ...details, newsletter_opt_in: e.target.checked })}/>Receive IHLink updates by email</label>
      <div className="sm:col-span-2"><Button disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</Button></div>
    </form></Card>
    {settings && <><Card className="mt-6"><h2 className="font-bold">Appearance</h2><p className="mt-2 text-sm text-muted">Choose how the standalone Consult workspace appears on this device.</p><div className="mt-4 flex flex-wrap gap-3">{(['light','system','dark'] as const).map(mode => <Button key={mode} type="button" variant={appearance===mode?'primary':'secondary'} onClick={() => setAppearance(mode)}>{mode[0].toUpperCase()+mode.slice(1)}</Button>)}</div></Card><Card className="mt-6"><h2 className="font-bold">Password and access</h2><p className="mt-2 text-sm text-muted">Your Consult access is managed through your IHLink account.</p><Link className="mt-4 inline-block font-bold text-orange-700" to="/reset-password">Reset password</Link></Card></>}
  </main></PageShell>;
}
