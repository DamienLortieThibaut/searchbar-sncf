
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
# Les barres de recherches SNCF

L'objectif de ce projet était d'intégrer les trois barres de recherche avec l'autocomplétion que l'on peut trouver sur la [SNCF](https://www.sncf-connect.com/ "Site de la SNCF").

# Installation
```bash
# Copie du repo
git clone https://github.com/DamienLortieThibaut/searchbar-sncf.git

# Se rendre dans le répertoire
cd searchbar-sncf

# Installer les modules adéquates
npm i

# Et voilà vous êtes prêts pour développer !
```

# Technologies

Le site a été fait avec différentes technologies qui sont:
 - React et TypeScript pour les composants et le système de Root
 - Sass pour le style des pages
 - Font Awesome pour le logo des villes

3 API:
 - [https://api.comparatrip.eu/cities/popular/5](https://api.comparatrip.eu/cities/popular/5) pour avoir les cinq choix les plus populaires
 - [https://api.comparatrip.eu/cities/autocomplete/?q=${recherche}](https://api.comparatrip.eu/cities/autocomplete/?q=) pour avoir les suggestions qui évoluent en fonction de ce que renseignent l'utilisateur
 - [https://api.comparatrip.eu/cities/popular/from/${villeDeDépart}/5](https://api.comparatrip.eu/cities/popular/from/paris/5) pour avoir les 5 choix d'arrivée les plus populaires en fonction de la ville de départ
 
# Fonctionnalités

 Sur la première page on retrouve:
 - La barre de recherche pour le départ
 - L'effet qui remonte la barre de recherche vers le haut avec un changement de fond en même temps
 - Une suggestion des cinq choix les plus populaires lorsque l'utilisateur a simplement le focus sur la barre
 - Une suggestion de choix en fonction des caractères que renseignent l'utilisateur dans sa barre de recherche
 - Un bouton pour envoyer la sélection de l'utilisateur vers la deuxième page:
	 - Si l'utilisateur n'a pas le focus sur l'input alors rien n'est renseigné pour la seconde page
	 - Si l'utilisateur a le focus sur l'input et même si il ne sélectionne rien dans les suggestions alors c'est le premier choix qui sera sélectionné comme ville de départ

Sur la seconde page: 
- Une barre de recherche pour le départ qui est complété ou non selon le choix de l'utilisateur en première page
- Une barre de recherche pour l'arrivée qui a un autofocus à l'arrivée sur la page
- Un bouton qui permet d'interchanger les valeurs que contiennent les deux barres de recherche avec l'animation au clic
- La suggestion de la barre de recherche pour le départ fonctionne de la même manière que sur la première page
- La suggestion de la barre de recherche pour l'arrivée:
	- Si la barre de recherche est vide et que l'utilisateur a au préalable renseigné la ville de départ alors on suggère les 5 villes les plus populaires d'arrivée par rapport à la ville de départ renseignée
	- Si l'utilisateur n'a pas renseigné la ville de départ alors on propose simplement les 5 villes les plus populaires
	
> Remarque: On ne respecte pas complétement la version originale puisque normalement les suggestions n'arrivent qu'au deuxième caractère renseigné par l'utilisateur or ici on propose directement les choix les plus populaires.

## Pages

Le site web est composé de deux pages

 - La barre de recherche pour le départ sur la première page
 - Une double barre de recherche sur la deuxième page avec l'arrivée à renseigner et le départ sélectionné en amont sur la première page
 
 > Remarque: L'intégration n'est pas exactement la même dans le cas présent puisque sur l'original on renseigne d'abord la barre de recherche d'arrivée puis ensuite le départ or ici on fait l'inverse car l'API ne nous permet pas de proposer des choix de départ en fonction des arrivées.

## Composants

Le site web est composé de sept composants:

### DoubleSearchBar
C'est le composant principal pour la deuxième page.
#### Props
| Props | Type | Utilité |
|--------|-------|--------|
| city | `string` | Récupère la ville sélectionnée dans le même format que sur le site original |
|uniqueName|`string` | Récupère la ville sélectionnée dans le format qui est accepté par l'API pour faire des suggestions par rapport à une ville de départ|

### Fonctions

| Fonction | Paramètre | Type | Utilité |
| -----------|--------------|-------|--------|
| handleButtonClick|event|`React.MouseEvent<HTMLButtonElement>`| Inverse les deux valeurs dans les inputs |
|focusInput | input | `React.RefObject<HTMLInputElement>`| Fixe le focus sur l'input passé en paramètre |
|handleInputBlur |     |     | Mettre à null le state qui écoute le focus sur les inputs à un clic en dehors d'un input|
| handleInputFocus | inputName | `string` |  Mettre à jour le state qui écoute le focus sur les inputs en lui donnant le nom de l'input |
|updateInputMessage | city,suggestion,inputName | `string`, `string`, `string``| Met à jour la valeur dans l'input avec le bon format lorsqu'une suggestion est séléctionnée par l'utilisateur | 

### Hook		
| Hook | Utilité |
| ------|---------|
| useEffect | Revenir en haut de la page et enlever le style appliqué à la première page sur le body|

### Autres composants

- Space
- Input
- SwitchButton
- Result

## Input
C'est un composant qui est utilisé dans DoubleSearchBar. Il sert à créer les deux inputs avec les propriétés adéquates pour chacun d'eux en fonction des props.

### Props

| Props | Paramètre | Type | Utilité |
|-------|-----------|-------|-------|
|autofocos(facultatif)|      | `boolean` |  Fixe l'autofocus |
|label|      | `string` | Renseigne le label |
|placeholder|      | `string` | Renseigne le placeholder |
| value|      |`string` | Renseigne la valeur de l'input|
| className |      |`string` | Avoir un style différent |
| onChange | event: `React.ChangeEvent<HTMLInputElement>`|      | Met à jour le state qui gère la valeur de l'input |
| onClick | event: `React.MouseEvent<HTMLDivElement>`|          | Sélectionne l'input peut importe où l'utilisateur clique dans la div |
| onBlur |`React.FocusEventHandler<HTMLInputElement> | undefined `|       | Met à jour le state lorsque l'utilisateur clique en dehors de l'input |
|onFocus | `React.FocusEventHandler<HTMLInputElement> | undefined `|        | Met à jour le state lorsque l'utilisateur clique sur l'input |
| inputRef | `React.RefObject<HTMLInputElement>`|     | Récupérer les propriétés de l'input |

## Result
C'est le composant qui s'occupe de proposer les suggestions à l'utilisateur à partir des données des 3 API.

### Props
| Props | Type | Utilité |
|--------|-------|--------|
|inputFocused| `string | null ` | Savoir quel input est focus|
|departureValue(facultatif)| `string` | Connaitre la valeur que contient l'input pour le départ |
| arrivalValue(factultatif)| `string` | Connaitre la valeur que contient l'input pour l'arrivée |
| cityLink(facultatif) | `string` | Avoir au bon format la ville de départ pour la recherche des 5 villes les plus populaires au départ d'une ville donnée |
| updateInputMessage | city, suggestion, inputName | `string`, `string`, `string` | Mettre à jour la valeur de l'input avec la suggestion sélectionnée par l'utilisateur |
		
### Hook
| Hook | Utilité |
|--------|---------|
|useEffect| Permet de sélectionner la bonne API parmi les trois avec le bon paramètre |

## SingleSearchBar
C'est le composant principal pour la première page.
 
 ### Fonctions:

| Fonction | Paramètre | Type | Utilité |
|------------|-------------|-------|---------|
| handleInputBlur |          |         | Mettre à null le state qui écoute le focus sur les inputs à un clic en dehors d'un input|
| handleInputChange|         |        | Mettre à jour la valeur dans l'input|
|handleInputFocus |inputName| `string` | Mettre à jour le state qui écoute le focus sur les inputs en lui donnant le nom de l'input|
|updateInputMessage |city, suggestion, inputName |`string`, `string`, `string` | Met à jour la valeur dans l'input avec le bon format lorsqu'une suggestion est séléctionnée par l'utilisateur |

### Hook
| Nom | Utilité |
|-------|-------|
useEffect | Affecter le style nécessaire au body lors du focus de l'input|

### Autres composants
- SubmitButton
- Result

## Space
C'est le composant qui sert à simuler du contenu sur la page

## SubmitButton
C'est le composant qui sert à valider le départ si l'utilisateur ne sélectionne pas une suggestion

### Props
| Nom | Type | Utilité |
|-------|-------|------|
|inputmessage | `string | undefined` | Donne la valeur de l'input |

### Fonction 
| Fonction | Utilité |
|------------|--------|
| selectChoice | Change de page et le chemin en fonction de la valeur de l'input |

### Hook
| Hook | Utilité |
|--------|---------|
| useEffect | Permet de sélectionner la bonne API parmi les deux premières |


## SwitchButton
C'est le composant qui permet d'inverser la valeur des deux inputs sur la deuxième page.

### Props:

| Props | Paramètre | Type | Utilité |
|--------|-------------|-------|-------|
|onClick| event: `React.MouseEvent<HTMLButtonElement>`| | Inverse les deux valeurs dans les inputs|
| rotate |      | `number` | Avoir une animation qui fait une rotation de 180° dans le sens horaire |