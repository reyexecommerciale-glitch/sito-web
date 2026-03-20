<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/33d5622f-8de5-4bce-8db9-a048fbfb8e1a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Abilitare la dashboard admin con Supabase

1. Crea un progetto Supabase e copia **Project URL** e **anon public key**.
2. Crea il file `.env` (o aggiungi ai Secrets di hosting):
   ```
   VITE_SUPABASE_URL=https://<your-project>.supabase.co
   VITE_SUPABASE_ANON_KEY=<public-anon-key>
   ```
3. In Supabase SQL esegui queste tabelle minime:
   ```sql
   create table if not exists site_content (
     id text primary key,
     data jsonb not null,
     updated_at timestamp with time zone default now()
   );

   create table if not exists projects (
     id text primary key,
     title text,
     type text,
     category text,
     client text,
     year text,
     description text,
     coverImage text,
     images text[] default '{}',
     role text,
     created_at timestamp with time zone default now()
   );
   ```
4. Nel pannello Auth di Supabase crea gli utenti admin (email/password). Accedi da `/admin/login`.
5. La dashboard salva e carica automaticamente contenuti, pagine custom e progetti da Supabase. Se le variabili non sono impostate, usa comunque il fallback in `localStorage`.
