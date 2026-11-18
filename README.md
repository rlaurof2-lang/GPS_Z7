# GPS_Z7 — PWA v0.3 com login e registros privados

Aplicativo gratuito hospedado no GitHub Pages, com autenticação Supabase por e-mail e senha, pontos, trilhas, polígonos, mapa OSM, UTM e exportação GeoJSON, CSV e KML.

**Configuração obrigatória:** leia `INSTRUCOES_SUPABASE.md`, execute `supabase_schema.sql` no Supabase e preencha `config.js` antes de publicar.

A chave `anon`/`publishable` é pública; a proteção dos dados depende das políticas RLS do SQL. Nunca publique `service_role`/`secret`.

A versão anterior não tinha login. Os dados antigos não são automaticamente importados para nenhuma conta. Faça backup antes de atualizar. O código desta versão foi validado quanto à sintaxe JavaScript, mas não foi testado com um projeto Supabase real nem em celular.
