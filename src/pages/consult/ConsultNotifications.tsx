import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '@/components/PageShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

type Notice = { id: string; title: string; body: string; kind: string; project_id: string | null; read_at: string | null; created_at: string };
export function ConsultNotifications() {
  const { user } = useAuth();
  const [items, setItems] = useState<Notice[]>([]);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    if (!supabase || !user) return;
    const { data, error: failure } = await supabase.from('consult_notifications').select('id,title,body,kind,project_id,read_at,created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(100);
    setItems((data || []) as Notice[]); setError(failure?.message || '');
  }, [user]);
  useEffect(() => { void load(); }, [load]);
  async function markRead(item: Notice) {
    if (!supabase || !user) return;
    const { data: saved, error: failure } = await supabase.from('consult_notifications').update({ read_at: new Date().toISOString() }).eq('id', item.id).eq('user_id', user.id).select('id').maybeSingle();
    if (failure || !saved) setError(failure?.message || 'This notification could not be updated. Reload and try again.'); else await load();
  }
  return <PageShell product="consult"><main className="mx-auto max-w-4xl px-6 py-12"><p className="font-bold text-orange-600">IHLink Consult</p><h1 className="mt-2 text-3xl font-black">Notifications</h1><p className="mt-2 text-muted">Updates about your Consult projects and requests.</p>
    {error && <p role="alert" className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
    <div className="mt-6 space-y-3">{items.map(item => <Card key={item.id} className={item.read_at ? '' : 'border-orange-300'}><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-bold">{item.title}</h2><p className="mt-1 text-sm text-muted">{item.body}</p><p className="mt-2 text-xs text-muted">{new Date(item.created_at).toLocaleString('en-NG')}</p></div>{!item.read_at && <Button size="sm" variant="secondary" onClick={() => void markRead(item)}>Mark read</Button>}</div>{item.project_id && <Link className="mt-3 inline-block text-sm font-bold text-orange-700" to={`/consult/portal/projects/${item.project_id}`}>Open project</Link>}</Card>)}{!items.length && !error && <Card>No Consult notifications yet.</Card>}</div>
  </main></PageShell>;
}
