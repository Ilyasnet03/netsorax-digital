# Netsorax

Vitrine française pour un studio d’ingénierie numérique, avec formulaire de demande de projet et espace d’administration privé.

## Stack

- Next.js App Router, React, TypeScript et Tailwind CSS
- Framer Motion pour les animations de révélation au défilement
- PostgreSQL et Prisma pour enregistrer les demandes
- Sessions administrateur chiffrées avec `iron-session` et mots de passe vérifiés avec bcrypt
- Netlify pour l’hébergement Next.js et Neon pour PostgreSQL

## Déploiement gratuit (Netlify + Neon)

Les offres gratuites ont des quotas et conditions susceptibles d’évoluer. Netlify héberge l’application ; Neon conserve les demandes dans PostgreSQL. SQLite n’est pas utilisé en production : son disque local n’est pas un stockage persistant pour les fonctions serverless.

### 1. Créer la base Neon

1. Créez un projet sur [Neon](https://neon.com/).
2. Dans **Connect**, récupérez les deux URL PostgreSQL :
   - **Pooled** (hôte contenant `-pooler`) pour `DATABASE_URL`.
   - **Direct / unpooled** pour `DIRECT_URL`, utilisé par les migrations.
3. Pour l’URL pooled, gardez `sslmode=require` et ajoutez `pgbouncer=true` (avec `&` si l’URL contient déjà des paramètres).

### 2. Préparer les secrets

Générez un nouveau mot de passe administrateur, unique et d’au moins 16 caractères. **N’utilisez pas le mot de passe communiqué dans la conversation** : il a été exposé et ne doit pas servir en production.

Depuis un terminal interactif à la racine du projet :

```powershell
npm install
npm run admin:hash
```

Le script masque la saisie et affiche une valeur bcrypt encodée en Base64. Copiez cette valeur : c’est `ADMIN_PASSWORD_HASH_B64`. Le mot de passe en clair n’est ni affiché ni enregistré par le script.

Générez également une clé de session :

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Utilisez cette valeur comme `SESSION_SECRET`. Ne la partagez pas et ne la commitez jamais.

### 3. Configurer les variables de production dans Netlify

Ouvrez les [variables d’environnement du site Netsorax](https://app.netlify.com/projects/netsorax-ilyasben/configuration/env) et ajoutez-les au contexte **Production** :

```dotenv
DATABASE_URL="URL_NEON_POOLED"
DIRECT_URL="URL_NEON_DIRECTE"
SESSION_SECRET="CLE_ALEATOIRE"
ADMIN_EMAIL="votre-adresse-admin"
ADMIN_PASSWORD_HASH_B64="VALEUR_BCRYPT_BASE64"
```

`ADMIN_EMAIL` a déjà été configuré dans le site Netlify connecté. Vérifiez qu’il correspond à l’adresse d’administration souhaitée. Saisissez les URL Neon et les nouveaux secrets directement dans Netlify, jamais dans le chat ou le dépôt. Si vous remplacez le secret de mot de passe, générez-le localement avec `npm run admin:hash`.

### 4. Appliquer les migrations et publier

Le site Netlify `netsorax-ilyasben` est déjà lié à ce dossier. Depuis PowerShell, à la racine du projet, lancez :

```powershell
npm run deploy:production
```

Le script demande les URL Neon pooled et directe avec une saisie masquée, applique les migrations, puis lance la construction et le déploiement de production. Les URL ne s’affichent pas dans le terminal. Il s’arrête si la migration échoue. La migration crée les tables et index ; elle ne copie pas la base SQLite locale.

Netlify fournit l’adresse HTTPS `https://netsorax-ilyasben.netlify.app`. Un dépôt GitHub n’est pas nécessaire pour cette publication directe. Pour activer plus tard les déploiements automatiques, reliez un dépôt GitHub au site.

Avant tout changement ultérieur de `prisma/schema.prisma`, créez une migration avec `npm run db:migrate -- --name nom-du-changement`, commitez le dossier `prisma/migrations`, puis appliquez-la à la base Neon avec `npm run db:deploy` avant le déploiement.

### 6. Vérifier le site publié

- Ouvrez l’adresse Netlify et testez la vitrine.
- Envoyez une demande réelle de test, puis vérifiez qu’elle apparaît dans `/admin`.
- Connectez-vous à `/admin/login` avec le nouvel e-mail et le nouveau mot de passe.
- Supprimez la demande de test et vérifiez les filtres, statuts et actions du tableau de bord.

Un nom de domaine personnalisé n’est pas inclus dans la gratuité de son enregistrement ; l’adresse `*.netlify.app` suffit pour débuter.

## Développement local

Pour travailler en local, renseignez dans `.env` les mêmes variables Neon que ci-dessus. Après la configuration initiale, lancez :

```powershell
npm install
npm run db:generate
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). Pour reconstruire le client Prisma après un changement de schéma, lancez `npm run db:generate`. Le tableau de bord et la soumission du formulaire exigent une connexion à PostgreSQL.

## Fonctionnalités

- Vitrine responsive avec expertises, projets de démonstration, présentation et formulaire de contact.
- Validation côté navigateur et serveur. Les demandes sont enregistrées dans PostgreSQL.
- Connexion admin par e-mail et mot de passe, avec cookie de session `HttpOnly`, `SameSite=Lax` et `Secure` en production.
- Tableau de bord avec volumes, répartition par service, filtres, statut, lecture/non-lue et suppression des demandes.

Les projets de portfolio sont des contenus de démonstration à remplacer par les informations réelles de l’agence.
