import {useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {PageShell} from '@/components/PageShell';
import {Card} from '@/components/ui/Card';
import {supabase} from '@/lib/supabase';
type Entry={title:string;subtitle:string|null;body:string|null;image_url:string|null};
export function ConsultCaseStudy(){
 const {slug}=useParams();const [entry,setEntry]=useState<Entry|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 useEffect(()=>{let active=true;setLoading(true);setEntry(null);setError('');async function load(){if(!supabase){setError('Published case-study content is unavailable.');setLoading(false);return}const r=await supabase.from('site_content_blocks').select('title,subtitle,body,image_url').eq('page_key','consult').eq('page_path','/consult/portfolio').eq('section_key','case-study-'+slug).eq('is_visible',true).maybeSingle();if(active){setEntry(r.data as Entry|null);setError(r.error?.message||'');setLoading(false)}}void load();return()=>{active=false}},[slug]);
 return <PageShell product="consult"><main className="mx-auto max-w-5xl px-6 py-16"><Link className="font-bold text-orange-700 underline" to="/consult/portfolio">Back to portfolio</Link>{loading?<Card className="mt-6">Loading case study…</Card>:error?<p role="alert" className="mt-6 text-rose-700">{error}</p>:!entry?<Card className="mt-6">This case study is unavailable or has not been published.</Card>:<article className="mt-8"><p className="font-bold text-orange-600">Published Consult case study</p><h1 className="mt-3 text-4xl font-black">{entry.title}</h1>{entry.subtitle&&<p className="mt-4 text-lg text-muted">{entry.subtitle}</p>}{entry.image_url?.startsWith('https://')&&<img src={entry.image_url} alt={entry.title} className="mt-8 h-auto w-full object-contain"/>}<p className="mt-8 whitespace-pre-wrap leading-8">{entry.body}</p><Link className="mt-8 inline-block font-bold text-orange-700 underline" to="/consult/quote">Discuss a related project</Link></article>}</main></PageShell>
}
