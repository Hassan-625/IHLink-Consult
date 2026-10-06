import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PageShell } from '@/components/PageShell';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

const field = 'w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-orange-500 focus:outline-none';
export function ConsultSignIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.pathname === '/register' ? 'register' : location.pathname === '/reset-password' ? 'reset' : location.pathname === '/consult/update-password' ? 'update' : 'signin';
  const next = new URLSearchParams(location.search).get('next');
  const destination = next?.startsWith('/') && !next.startsWith('//') ? next : '/consult/portal';
  const [form, setForm] = useState({ email: '', password: '', firstName: '', middleName: '', lastName: '', phone: '', sex: '', newsletterOptIn: false });
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (mode === 'signin' && auth.user && !auth.loading && auth.profile?.id === auth.user.id && !auth.authError) navigate(destination, { replace: true }); }, [mode, auth.user, auth.profile, auth.loading, auth.authError, navigate, destination]);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice('');
    if (mode === 'reset') {
      const error = await auth.resetPassword(form.email);
      setNotice(error || 'If this email has an IHLink account, a password reset link has been sent.');
    } else if (mode === 'update') {
      if (!supabase) setNotice('Authentication unavailable.');
      else { const { error } = await supabase.auth.updateUser({ password: form.password }); if (error) setNotice(error.message); else navigate('/consult/settings'); }
    } else if (mode === 'register') {
      const result = await auth.signUp(form);
      setNotice(result.error || (result.existingAccount ? 'This account already exists. Please sign in.' : result.needsVerification ? 'Check your email to verify your account.' : 'Account created. Your Consult access will appear when activated.'));
    } else {
      const error = await auth.signIn(form.email, form.password);
      if (error) setNotice(error); else setNotice('Checking your IHLink account permissions…');
    }
    setBusy(false);
  }
  const title = { signin: 'Sign in to IHLink Consult', register: 'Create an IHLink Consult account', reset: 'Reset your password', update: 'Choose a new password' }[mode];
  return <PageShell product="consult"><main className="mx-auto max-w-md px-6 py-16"><p className="font-bold text-orange-600">IHLink Consult</p><h1 className="mt-2 text-3xl font-black">{title}</h1>
    {(notice || auth.authError) && <p role="status" className="mt-5 rounded-xl border bg-white p-3 text-sm">{auth.authError || notice}</p>}
    <form onSubmit={submit} className="mt-8 space-y-4">
      {mode === 'register' && <><input className={field} required placeholder="First name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}/><input className={field} placeholder="Middle name" value={form.middleName} onChange={e => setForm({ ...form, middleName: e.target.value })}/><input className={field} required placeholder="Last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}/><input className={field} required type="tel" placeholder="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}/><select className={field} value={form.sex} onChange={e => setForm({ ...form, sex: e.target.value })}><option value="">Select sex</option><option value="male">Male</option><option value="female">Female</option></select></>}
      {mode !== 'update' && <input className={field} type="email" required placeholder="Email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>}
      {mode !== 'reset' && <input className={field} type="password" minLength={8} required placeholder={mode === 'update' ? 'New password' : 'Password'} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>}
      {mode === 'register' && <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.newsletterOptIn} onChange={e => setForm({ ...form, newsletterOptIn: e.target.checked })}/>Send me IHLink updates</label>}
      <Button fullWidth disabled={busy}>{busy ? 'Please wait…' : mode === 'register' ? 'Create account' : mode === 'reset' ? 'Send reset link' : mode === 'update' ? 'Save password' : 'Sign in'}</Button>
      {mode === 'signin' && <Button type="button" variant="secondary" fullWidth onClick={async () => setNotice((await auth.signInWithGoogle()) || '')}>Continue with Google</Button>}
    </form>
    <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-orange-700">{mode !== 'signin' && <Link to="/signin">Sign in</Link>}{mode !== 'register' && <Link to="/register">Create account</Link>}{mode === 'signin' && <Link to="/reset-password">Forgot password?</Link>}</div>
  </main></PageShell>;
}
