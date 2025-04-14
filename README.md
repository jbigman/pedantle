## IMDB API KEY :

La clé api n'est pas dans le projet, en local, il faut ajouter 

NEXT_PUBLIC_IMDB_TOKEN=<key>
ou alors, si deployé en prod, il faut l'ajouter durant le build, si guthub actions, via la clé secrete MY_IMDB_TOKEN

## Ajouts
- ajout de la date de sortie du film
- mise a jour du contenu du modal pour contenir les infos demandées. (sauf les genres, sous form d'id qu'il faudrait faire correspondre avec un texte)
- du filtre include_adult à false, mais il est deja a false par defaut dans l'api, donc c'est juste pour assuser le coup s'ils venaient a changer la valeur par defaut.
- d'une check box pour filter uniquement les films avec une vidéo.
- d'un système de pagination