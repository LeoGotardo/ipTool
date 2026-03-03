# IPTool

Ferramenta de lookup de endereços IP com visualização geográfica e dados detalhados de rede, construída com React + Vite.

## Preview

Interface com estética terminal/hacker — fundo escuro, tipografia monospace, scanlines e mapa interativo integrado.

## Funcionalidades

- Validação de endereços **IPv4** e **IPv6**
- Exibição de localização geográfica (cidade, região, país, continente)
- **Mapa interativo** via Leaflet com marcador na coordenada exata
- Dados de rede: tipo de IP, tipo de conexão, roteamento, MSA/DMA
- Informações de localização: fuso horário, capital, idiomas, código de chamada
- Indicação de pertencimento à **União Europeia**

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + Vite |
| Mapa | Leaflet 1.9 (carregado dinamicamente) |
| API de dados | [ipapi.com](https://ipapi.com) |
| Fontes | Orbitron + Share Tech Mono (Google Fonts) |
| Estilo | CSS puro com variáveis |

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura

```
src/
├── components/
│   ├── button.jsx      # Botão reutilizável
│   ├── input.jsx       # Campo de texto reutilizável
│   ├── map.jsx         # Mapa Leaflet (lazy load)
│   ├── page.jsx        # Layout principal
│   └── response.jsx    # Card de resultado do lookup
├── utils/
│   └── lookup.js       # Lógica de validação e chamada à API
├── App.jsx
├── App.css             # Estilos globais + tema terminal
└── main.jsx
```

## Uso

1. Digite um endereço IP válido no campo de entrada
2. Clique em **Lookup**
3. O card de resultado exibe os dados completos com mapa

**Exemplos de IP para testar:**
```
8.8.8.8          # Google DNS (EUA)
1.1.1.1          # Cloudflare (Austrália)
177.75.40.100    # Brasil
```

## API

O projeto utiliza a [ipapi.com](https://ipapi.com). A chave de acesso está definida diretamente em `src/utils/lookup.js`.

> Para uso em produção, mova a chave para uma variável de ambiente (`.env`):
> ```
> VITE_IPAPI_KEY=sua_chave_aqui
> ```

## Licença

MIT