# Dia : TD1

TD1 du cours de développement et déploiement d'applications distribuées.

L'objectif de ce TD est de développer un serveur TCP minimaliste répondant à des commandes textes en utilisant Node.js.

## Protocole

Le protocole est en texte et il utilise le port 8123 en TCP. C'est un cache mémoire sur un modèle clé / valeur qui propose les commandes suivantes :

* `KEYS\n` : liste les clés, elles sont séparées par un `\n`;
* `PUT <key> <data-length> <data>\n` : stocke une chaine de caractères `<data>` de taille `<data-length>`dans la clé `<key>`. Renvoie au client `ok\n` en cas de succès ou `ko\n` sinon;
* `GET <key>\n` : pour la clé `<key>` renvoie au client la longueur de la chaine de caractères associé suivie d’un saut de ligne puis la chaine associé. Renvoie `0\n` si la clé est inexistante;
* `DEL <key>\n` : supprime la clé / valeur `<key>`. Renvoie au client `ok\n` en cas de succès ou `ko\n` sinon.

## Implémentation

En Node.js, la librairie standard ***net*** permet de manipuler facilement les sockets : https://nodejs.org/api/net.html.

Vous pouvez implémenter votre serveur dans le fichier `server.js`.

J'ai configuré pour vous ce dépôt pour que les modifications que vous faites dans le fichier `server.js` recharge automatiquement le serveur. Dans un terminal, lancer les commandes suivantes :

    npm install
    npm start

`npm install` va installer les dépendances listées dans le `package.json`. Dans notre cas, `nodemon` qui permet de recharger un fichier quand il est modifié.

`npm start` lance la commande `start` définie dans le `package.json`, ici `nodemon server.js`.

## Test

Vous pouvez tester directement via :

    telnet localhost 8123

Ou en utilisant des tests déjà écrits par moi-même :

    npm test

## Ce que je dois retenir

Ce que vous venez de coder est une base extrêmement simple pour un serveur web par exemple. Maintenant, on ne s'amuse pas coder ce genre de chose tous les jours. On va utiliser un outil qui va nous simplifier la vie comme [Express](http://expressjs.com/fr/) en Node.js. Si maintenant votre application a besoin de gérer de manière fine l'échange de ses données, on verra au TD2 comment utiliser [ØMQ](http://zeromq.org/).

Un autre élément à retenir est que l'on ne vous parle pas de multithreading ici car Node.js est mono-thread. Du coup, vous n'avez pas de problèmes de lock de données sur un même processus.

## Pour aller plus loin

Les tests que j'ai écrit sont assez basiques. Que ce passe t'il, s'il y a un `\n` dans la chaine de caractères ? Si vous supprimez une valeur qui n'existe pas ? S'il y a des caractères spéciaux dans vos chaines ?

Étendre les tests pour prendre en compte plus de cas.
