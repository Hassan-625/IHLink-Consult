import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {PageShell} from '@/components/PageShell';
import {SectionTitle} from './consultShared';
import {Card} from '@/components/ui/Card';
import {supabase} from '@/lib/supabase';
type Entry={id:string;section_key:string;title:string;subtitle:string|null;body:string|null;image_url:string|null};
export function ConsultPortfolio(){
 const [entries,setEntries]=useState<Entry[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState('');
 useEffect(()=>{let active=true;async function load(){if(!supabase){setError('Published portfolio content is unavailable.');setLoading(false);return}const r=await supabase.from('site_content_blocks').select('id,section_key,title,subtitle,body,image_url').eq('page_key','consult').eq('page_path','/consult/portfolio').eq('is_visible',true).like('section_key','case-study-%').order('sort_order');if(active){setEntries((r.data||[]) as Entry[]);setError(r.error?.message||'');setLoading(false)}}void load();return()=>{active=false}},[]);
 return <PageShell product="consult"><section className="px-6 lg:px-12 py-16"><SectionTitle eyebrow="Published work" title="Solutions shaped around real problems"/>{error&&<p role="alert" className="mb-5 text-rose-700">{error}</p>}{loading&&<Card>Loading published case studies…</Card>}<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{entries.map(x=><Link to={'/consult/case-study/'+encodeURIComponent(x.section_key.slice('case-study-'.length))} className="group overflow-hidden rounded-2xl border bg-white shadow-card" key={x.id}>{x.image_url?.startsWith('https://')&&<img src={x.image_url} alt={x.title} className="h-48 w-full object-contain"/>}<div className="p-6"><h2 className="text-lg font-bold group-hover:text-orange-600">{x.title}</h2><p className="mt-2 text-sm text-muted">{x.subtitle||x.body}</p><p className="mt-4 font-bold text-orange-700">Read case study</p></div></Link>)}</div>{!loading&&!error&&!entries.length&&<Card>No public Consult case studies have been published yet. <Link className="font-bold text-orange-700 underline" to="/consult/quote">Discuss your project</Link></Card>}</section></PageShell>
}
