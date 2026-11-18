# GPS_Z7 v0.3 — Configuração gratuita do Supabase

**Não envie dados reais antes de concluir a configuração e testar as permissões.**

1. Entre em https://supabase.com/dashboard e crie um projeto gratuito. Guarde a senha do banco somente no Supabase, nunca no GitHub.
2. Em **SQL Editor**, abra `supabase_schema.sql`, copie seu conteúdo e execute. A tabela terá segurança RLS, com leitura e escrita apenas do proprietário autenticado.
3. Em **Authentication → Providers → Email**, habilite o provedor Email e **Confirm email**. Configure a URL do site em **Authentication → URL Configuration → Site URL** para `https://rlaurof2-lang.github.io/GPS_Z7/`. Em Redirect URLs, inclua esse mesmo endereço, se necessário.
4. Em **Project Settings → API** (ou **Connect / API Keys**, conforme a interface), copie a **Project URL** e a chave **publishable** ou **anon public**. Edite `config.js`, substituindo os dois textos `COLE_AQUI_...` pelos valores públicos. **Nunca utilize a chave `service_role` ou `secret` no frontend.**
5. No GitHub, abra o repositório `GPS_Z7` e use **Add file → Upload files**. Envie os arquivos desta atualização para a **raiz** do repositório e confirme **Commit changes**. Aguarde o GitHub Pages concluir a publicação.
6. No Chrome do celular, abra `https://rlaurof2-lang.github.io/GPS_Z7/`. Atualize a página. Deve aparecer **GPS_Z7 — Acesso**. Crie a conta, confirme o e-mail e entre.
7. Teste: salve um ponto na conta A, sincronize, saia, entre na conta B e confirme que o ponto da conta A não aparece. Volte à conta A e confirme que o ponto aparece. Teste em outro dispositivo com a mesma conta e internet.

## Funcionamento offline e limites

- O **primeiro login exige internet**. Uma sessão previamente autenticada pode continuar com dados locais, mas, se a sessão expirar e não for possível renová-la, será necessário conectar-se para entrar novamente.
- Cada usuário tem seu próprio armazenamento local e seus próprios registros na nuvem. O armazenamento local do navegador **não é criptografado**; não use aparelho compartilhado sem proteção e não trate isso como isolamento contra alguém com acesso físico ou técnico ao aparelho.
- O botão **Sincronizar** envia alterações pendentes e busca registros da nuvem. Se falhar, os registros locais ficam preservados e a sincronização poderá ser repetida. Não limpe os dados do navegador enquanto houver pendências.
- O Supabase gratuito possui limites de utilização e pode pausar projetos inativos. O envio de e-mails de confirmação também está sujeito a limites; para produção com muitos usuários, poderá ser necessário configurar SMTP.
- O sistema atual não implementa recuperação de senha nem migração automática dos dados anteriores. Os registros da versão 0.2 continuam na chave `gpsz7.records.v1` no mesmo navegador, sem serem atribuídos a uma conta. **Exporte-os pela versão anterior antes de atualizar**, se precisar preservá-los fora do navegador. A importação controlada será uma próxima etapa.
- Os registros sincronizados são privados entre contas graças às políticas RLS. Não desabilite RLS.
- O GPS, o mapa, as trilhas e os polígonos continuam com as limitações já existentes da versão PWA.
