# Netsorax

Vitrine française pour un studio d’ingénierie numérique, avec formulaire de demande de projet et espace d’administration privé.

## Stack

- Next.js App Router, React, TypeScript et Tailwind CSS
- Framer Motion pour les animations de révélation au défilement
- PostgreSQL et Prisma pour enregistrer les demandes
- Sessions administrateur chiffrées avec `iron-session` et mots de passe vérifiés avec bcrypt
- Render pour l’hébergement Next.js et Neon pour PostgreSQL

## Déploiement sur Render

Le fichier [`render.yaml`](./render.yaml) décrit un Web Service Render dans la région de Francfort. Le service utilise Node.js 22, applique les migrations Prisma pendant le build, puis démarre Next.js. Il s’agit d’un serveur web, pas d’un site statique : le formulaire et l’espace d’administration ont besoin des fonctions serveur de Next.js.

### 1. Préparer PostgreSQL sur Neon

1. Créez ou réutilisez une base PostgreSQL sur [Neon](https://neon.com/).
2. Récupérez les deux URL de connexion :
   - **Pooled** (hôte contenant `-pooler`) pour `DATABASE_URL`. Gardez `sslmode=require` et ajoutez `pgbouncer=true` si nécessaire.
   - **Direct / unpooled** pour `DIRECT_URL`, utilisée par Prisma pour appliquer les migrations.
3. Pour limiter la latence, choisissez si possible une région Neon proche de Francfort.

Ne saisissez jamais ces URL dans le dépôt ou dans le chat.

### 2. Générer les secrets d’administration

Depuis un terminal interactif à la racine du projet, créez un nouveau mot de passe administrateur unique d’au moins 16 caractères et générez son hash :

```powershell
npm install
npm run admin:hash
```

Le script demande le mot de passe deux fois sans l’afficher et fournit la valeur à enregistrer comme `ADMIN_PASSWORD_HASH_B64`. N’enregistrez pas le mot de passe en clair.

Générez aussi une clé de session :

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Gardez ces deux valeurs privées. Ne réutilisez pas un mot de passe qui a été communiqué dans une conversation.

### 3. Créer le service Render

1. Poussez le projet sur un dépôt GitHub privé ou public. Vérifiez que `.env` n’est pas commité.
2. Dans le [Dashboard Render](https://dashboard.render.com/), choisissez **New → Blueprint** et connectez le dépôt qui contient `render.yaml`.
3. Lors de la création du service, renseignez les valeurs demandées pour `DATABASE_URL`, `DIRECT_URL`, `SESSION_SECRET`, `ADMIN_EMAIL` et `ADMIN_PASSWORD_HASH_B64`. Saisissez les secrets directement dans Render.
4. Validez la création. Render exécute le build défini dans `render.yaml` puis publie le service avec une adresse `onrender.com`.

Le build exécute `npx prisma migrate deploy` avant la compilation. Si les variables PostgreSQL ne sont pas renseignées ou si une migration échoue, le déploiement échoue au lieu de lancer l’application sans sa base. Pour les futures évolutions de `prisma/schema.prisma`, créez et commitez une migration avec `npm run db:migrate -- --name nom-du-changement` avant de publier.

Le Blueprint sélectionne l’offre gratuite pour démarrer. Selon les limites de Render, un service gratuit peut s’endormir après une période sans trafic et prendre environ une minute à redémarrer ; cette offre est destinée aux tests et projets personnels, pas à une application de production. Le système de fichiers du service n’est pas persistant : les demandes restent stockées dans Neon, pas sur le disque Render. Passez à une instance payante si vous avez besoin d’un service toujours actif.

### 4. Vérifier le déploiement

- Ouvrez l’URL fournie par Render et vérifiez la vitrine.
- Envoyez une demande de test et vérifiez qu’elle apparaît dans `/admin`.
- Connectez-vous à `/admin/login` avec l’adresse et le mot de passe configurés.
- Supprimez la demande de test et vérifiez les filtres et les actions du tableau de bord.

Cette configuration Render ne supprime ni ne désactive le déploiement Netlify existant. Choisissez l’adresse Render comme adresse de production lorsque vous serez prêt à basculer.

## Développement local

Pour travailler en local, configurez dans `.env` les mêmes variables Neon, puis lancez :

```powershell
npm install
npm run db:generate
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). Le tableau de bord et la soumission du formulaire nécessitent une connexion à PostgreSQL.

## Fonctionnalités

- Vitrine responsive avec expertises, projets de démonstration, présentation et formulaire de contact.
- Validation côté navigateur et serveur. Les demandes sont enregistrées dans PostgreSQL.
- Connexion admin par e-mail et mot de passe, avec cookie de session `HttpOnly`, `SameSite=Lax` et `Secure` en production.
- Tableau de bord avec volumes, répartition par service, filtres, statut, lecture/non-lue et suppression des demandes.

Les projets de portfolio sont des contenus de démonstration à remplacer par les informations réelles de l’agence.
