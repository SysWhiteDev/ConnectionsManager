# ConnectionsManager

ConnectionsManager is a dashboard to create shortened links and get accurate analytics and data on them, users can also lock the links with passwords.

⭐ Star us on GitHub — it motivates us a lot!

## Test it out!

You can test it out [here](https://qr.syswhite.dev/)


Or deploy it yourself on vercel:<br/>
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSysWhiteDev%2FConnectionsManager.git&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE,BCRYPT_SALT_ROUNDS&envDescription=Get%20the%20first%203%20env%20variables%20from%20your%20supabase%20project%2C%20the%20%22BCRYPT_SALT_ROUNDS%22%20can%20be%20any%20integer%2C%20note%20that%20it%20is%20reccomended%20to%20set%20it%20at%2012&project-name=connections-manager&repository-name=connections-manager&demo-title=ConnectionsManager&demo-url=https%3A%2F%2Fqr.syswhite.dev)

## Table of contents

- [Features](#features)
- [Roadmap](#roadmap)
- [API](#api)

## Features

- Connectors analytics
- Connectors password protection

<br/>
NOTE: connectors are smart link/qrcodes

## Roadmap

- [ ] Custom domains
- [ ] Activity logs
- [ ] Connectors analytics
- [ ] Connectors sharing
- [ ] Analytics sharing
- More to come...

## API

The folder for API routes it's located in `/app/api`

#### Application Routes:

- `/api/qr` | This route is used when an user visits a smart link

#### External apps routes:

- None, coming soon...
