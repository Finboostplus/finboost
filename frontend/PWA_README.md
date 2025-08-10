# PWA (Progressive Web App) - FinBoost+

## 📱 O que é uma PWA?

O FinBoost Plus agora é uma Progressive Web App (PWA), que significa que você pode:

- **Instalar no seu dispositivo** como um app nativo
- **Usar offline** com funcionalidades limitadas
- **Receber notificações** (futuro)
- **Inicialização rápida** com cache inteligente
- **Experiência mobile otimizada**

## 🚀 Como Instalar

### No Desktop (Chrome, Edge, Safari)
1. Acesse a aplicação no navegador
2. Clique no ícone de "Instalar" que aparece na barra de endereços
3. Ou use o botão "Instalar App" que aparece no canto inferior direito

### No Mobile (Android/iOS)
1. Abra a aplicação no navegador
2. **Android (Chrome)**: Toque em "Adicionar à tela inicial" no menu
3. **iOS (Safari)**: Toque no ícone de compartilhar e selecione "Adicionar à Tela de Início"

## 🔧 Funcionalidades PWA

### ✅ Implementadas
- **Manifest Web App**: Configuração para instalação
- **Service Worker**: Cache inteligente para performance
- **Ícones**: Múltiplos tamanhos para diferentes dispositivos
- **Modo Offline**: Indicador visual quando sem conexão
- **Instalação**: Prompt automático para instalação

### 🛠 Configurações Técnicas

#### Manifest (manifest.webmanifest)
```json
{
  "name": "FinBoost Plus",
  "short_name": "FinBoost+",
  "description": "Aplicativo de gestão financeira pessoal",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}
```

#### Service Worker
- **Cache First**: Recursos estáticos (CSS, JS, imagens)
- **Network First**: Dados dinâmicos (API calls)
- **Offline Fallback**: Páginas em cache quando offline

#### Ícones Incluídos
- `icon-192x192.png` - Ícone padrão
- `icon-512x512.png` - Ícone de alta resolução
- `apple-touch-icon.png` - Específico para iOS

## 📊 Como Testar

### 1. Desenvolvimento
```bash
npm run dev
```
**Nota**: PWA habilitada em desenvolvimento! O botão de instalação deve aparecer mesmo em `localhost`.

### 2. Build de Produção
```bash
npm run build
npm run preview
```
**Recomendado**: Para testar a experiência completa da PWA.

### 3. Verificar PWA
1. Abra o DevTools (F12)
2. Vá para a aba "Application"
3. Verifique "Manifest" e "Service Workers"

### 4. Lighthouse PWA Score
1. Abra o DevTools
2. Vá para "Lighthouse"
3. Selecione "Progressive Web App"
4. Execute o audit

## ⚠️ Diferenças entre Dev e Produção

### Em Desenvolvimento (`npm run dev`)
- ✅ PWA habilitada (com `devOptions: enabled`)
- ✅ Botão de instalação aparece
- ⚠️ Service Worker em modo de desenvolvimento
- ⚠️ Cache menos otimizado

### Em Produção (`npm run preview` ou deployed)
- ✅ PWA totalmente otimizada
- ✅ Service Worker de produção
- ✅ Cache otimizado
- ✅ Experiência completa de PWA

## 🔄 Atualizações Automáticas

A PWA está configurada para:
- **Auto-update**: Novas versões são baixadas automaticamente
- **Prompt de reload**: Usuário é notificado sobre atualizações
- **Cache invalidation**: Limpa cache antigo automaticamente

## 📱 Componentes PWA

### PWAInstaller
- Detecta se a PWA pode ser instalada
- Mostra prompt personalizado de instalação
- Gerencia eventos de instalação

### OfflineIndicator
- Monitora status de conexão
- Exibe banner quando offline
- Indica funcionalidades limitadas

### useOnlineStatus Hook
- Hook personalizado para detectar conectividade
- Reativo a mudanças de rede
- Usado em componentes que dependem de conectividade

## 🛠 Troubleshooting

### PWA não aparece para instalação
1. Verifique se está em HTTPS
2. Confirme se o manifest está carregando
3. Verifique se o service worker está registrado

### Service Worker não está funcionando
1. Limpe o cache do navegador
2. Verifique o console para erros
3. Force um hard refresh (Ctrl+Shift+R)

### Manifest inválido
1. Valide o JSON do manifest
2. Verifique se todos os ícones existem
3. Confirme as URLs do start_url e scope

---

<div align="center">
  <strong>Progressive Web App - FinBoost+</strong><br/>
  <em>Qualidade e experiência melhoradas</em>
</div>
