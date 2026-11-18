# GPS_Z7 — PWA v0.1

Aplicativo web instalável gratuito, independente de Base44 e Android Studio.

## Publicar grátis no GitHub Pages

1. Crie um repositório público chamado `GPS_Z7` no GitHub.
2. Envie **o conteúdo da pasta** `GPS_Z7_PWA` para a raiz do repositório (index.html, app.js, style.css, sw.js, manifest.webmanifest e pasta icons).
3. Abra **Settings > Pages**; em **Build and deployment**, escolha **Deploy from a branch**, branch **main**, pasta **/(root)** e clique **Save**.
4. Após a publicação, abra no celular `https://SEU_USUARIO.github.io/GPS_Z7/` (o endereço exato depende do nome da conta/repositório).
5. No Chrome Android, menu ⋮ > **Adicionar à tela inicial** ou **Instalar app**.

## Teste

Ative a localização, permita o acesso e aguarde uma coordenada. Teste salvar um ponto, marcar três vértices e fechar polígono, exportar GeoJSON/KML/CSV e reiniciar o app para confirmar persistência. Com internet desligada, a interface pode abrir após o primeiro carregamento e os registros continuam locais; o fundo de mapa online não é garantido offline.

## Limitações importantes

- HTTPS ou localhost é necessário para geolocalização e PWA. Abrir index.html como `file://` não funciona adequadamente.
- Rastreamento não é confiável com tela apagada ou navegador suspenso.
- Cálculo UTM usa WGS84 e a fórmula Transversa de Mercator; não implementa transformação de datum SIRGAS 2000.
- Áreas e perímetros são estimativas para campo, não levantamentos legais/cadastrais. Área usa aproximação plana local.
- Tiles OpenStreetMap são solicitados apenas quando visíveis. Não há download em massa nem suporte a mapas offline pré-carregados nesta versão. Respeite a política de uso do provedor.
- Dados são armazenados no localStorage do navegador: exporte backups regularmente. Limpar dados do site pode apagá-los.
- Sem servidor próprio, sincronização entre aparelhos não está implementada.

## Arquivos

- `index.html`: interface
- `style.css`: estilo responsivo
- `app.js`: GPS, UTM, mapa, coleta, trilhas, polígonos, exportação
- `sw.js`: cache da interface para abertura offline
- `manifest.webmanifest`: instalação PWA
- `icons/`: ícones
