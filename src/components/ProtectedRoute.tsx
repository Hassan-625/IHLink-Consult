import type {ReactNode} from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import {useAuth} from '@/context/AuthContext';
export function ProtectedRoute({children,requireServiceAccess=false,staffOnly=false,permission='view'}:{children:ReactNode;product?:string;requireServiceAccess?:boolean;staffOnly?:boolean;permission?:'view'|'edit'}){
 const {user,profile,adminAccess,serviceAccess,loading}=useAuth();const location=useLocation();
 if(loading)return <p role="status" className="p-8">Checking your account…</p>;
 if(!user)return <Navigate to={'/signin?next='+encodeURIComponent(location.pathname+location.search)} replace/>;
 if(profile?.status!=='active')return <Navigate to="/access-denied" replace/>;
 const grant=adminAccess.find((x:{product:string})=>x.product==='consult');
 const admin=profile.role==='super_admin'||['platform_admin','support','finance'].includes(profile.role)&&Boolean(permission==='edit'?grant?.can_edit:grant?.can_view);
 if(staffOnly&&!admin)return <Navigate to="/access-denied" replace/>;
 if(requireServiceAccess&&!admin&&!(profile.role==='customer'&&serviceAccess.some((x:{product:string;status:string})=>x.product==='consult'&&x.status==='active')))return <Navigate to="/access-denied" replace/>;
 return <>{children}</>;
}
