 'use strict';
(()=>{
const $=id=>document.getElementById(id),cfg=window.GPS_Z7_CONFIG||{};
const base=(cfg.supabaseUrl||'').replace(/\/$/,'');
const ready=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(base)&&!String(cfg.supabaseAnonKey).startsWith('COLE_');
let session=null,owner=null,busy=false,refreshing=null;
const sessionKey='gpsz7.auth.session.v3';
const say=(msg,err=false)=>{const el=$('authMessage');el.textContent=msg;el.classList.toggle('auth-error',err)};
function setBusy(v){busy=v;for(const id of ['loginBtn','signupBtn'])$(id).disabled=v}
async function api(path,opts={}){
  const token=opts.token||cfg.supabaseAnonKey;
  const response=await fetch(base+path,{method:opts.method||'GET',headers:{apikey:cfg.supabaseAnonKey,Authorization:'Bearer '+token,'Content-Type':'application/json',...(opts.headers||{})},body:opts.body===undefined?undefined:JSON.stringify(opts.body)});
  if(!response.ok){let msg='Erro HTTP '+response.status;try{const j=await response.json();msg=j.msg||j.error_description||j.message||j.error||msg}catch{}throw new Error(msg)}
  if(response.status===204)return null;const raw=await response.text();return raw?JSON.parse(raw):null;
}
function saveSession(s){session=s;try{if(s)localStorage.setItem(sessionKey,JSON.stringify(s));else localStorage.removeItem(sessionKey)}catch{}}
function showAccount(s){owner=s.user.id;$('authScreen').hidden=true;$('appMain').hidden=false;$('accountBar').hidden=false;$('accountEmail').textContent=s.user.email||'Conta autenticada';window.dispatchEvent(new CustomEvent('gpsz7:login',{detail:{userId:owner}}))}
function hideAccount(){owner=null;$('appMain').hidden=true;$('accountBar').hidden=true;$('authScreen').hidden=false;window.dispatchEvent(new Event('gpsz7:logout'))}
async function refresh(){if(refreshing)return refreshing;refreshing=(async()=>{if(!session?.refresh_token)throw new Error('Sessão expirada. Entre novamente.');const s=await api('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:session.refresh_token}});saveSession(s);return s})().finally(()=>refreshing=null);return refreshing}
async function token(){if(!session)throw new Error('Entre na sua conta.');if(Date.now()>=((session.expires_at||0)*1000-60000))await refresh();return session.access_token}
async function db(path,opts={}){let t=await token();try{return await api('/rest/v1/'+path,{...opts,token:t})}catch(e){if(/JWT expired|invalid JWT/i.test(e.message)){await refresh();t=await token();return api('/rest/v1/'+path,{...opts,token:t})}throw e}}
async function signIn(){if(!ready){say('Configure config.js com a URL e chave pública do Supabase antes de usar.',true);return}setBusy(true);say('Entrando...');try{const s=await api('/auth/v1/token?grant_type=password',{method:'POST',body:{email:$('email').value.trim(),password:$('password').value}});if(!s.user||!s.access_token)throw new Error('Sessão inválida');s.expires_at=Math.floor(Date.now()/1000)+(s.expires_in||3600);saveSession(s);$('password').value='';showAccount(s);say('')}catch(e){say('Não foi possível entrar: '+e.message,true)}finally{setBusy(false)}}
async function signUp(){if(!ready){say('Configure config.js primeiro.',true);return}setBusy(true);say('Criando conta...');try{await api('/auth/v1/signup',{method:'POST',body:{email:$('email').value.trim(),password:$('password').value}});$('password').value='';say('Cadastro solicitado. Verifique a caixa de entrada e spam, confirme o e-mail e depois clique em Entrar.')}catch(e){say('Falha no cadastro: '+e.message,true)}finally{setBusy(false)}}
$('authForm').addEventListener('submit',e=>{e.preventDefault();signIn()});$('signupBtn').onclick=signUp;
$('logout').onclick=async()=>{if(!confirm('Sair desta conta? Registros ainda não sincronizados permanecem neste aparelho.'))return;try{if(session)await api('/auth/v1/logout',{method:'POST',token:await token()})}catch{}saveSession(null);hideAccount()};
window.GPS_Z7_AUTH={db,getUserId:()=>owner,isReady:()=>ready};
(async()=>{if(!ready){say('Antes do primeiro login, configure o Supabase conforme o arquivo INSTRUCOES_SUPABASE.md.',true);return}try{const s=JSON.parse(localStorage.getItem(sessionKey)||'null');if(!s?.access_token||!s?.user?.id)return;session=s;const user=await api('/auth/v1/user',{token:await token()});if(user?.id===s.user.id){session.user=user;saveSession(session);showAccount(session)}else{saveSession(null)}}catch{saveSession(null);say('Entre novamente para continuar.')}})();
})();
