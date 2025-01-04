/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAGUELO_FACIL_CCLW: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 