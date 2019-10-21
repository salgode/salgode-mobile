<!-- [![travisB]][travisL] -->
[![stdVersionB]][stdVersionL]
[![commitsB]][commitsL]
[![prettierB]][prettierL]

# Salgode

Aplicación móvil para compartir viajes construida con [Expo](https://expo.io/) para web, iOS y Android. Backend se encuentra [aquí](https://github.com/Varuscl/salgode-api)

Sigue el desarrollo en [nuestro Trello](https://trello.com/b/GCTJ1iMU/salgode).

## Indice

- [Salgode](#salgode)
  - [Indice](#indice)
  - [Scripts](#scripts)
  - [Workflow](#workflow)
    - [Development](#development)
    - [Release](#release)
  - [Motores](#motores)
  - [Agradecimientos](#agradecimientos)

## Scripts

- `yarn dev`

  Abre un servidor para correr la app en tu celular.<br>
  Debes instalar [Expo](https://expo.io/) en tu celular. Para Android debes escanear el código QR desde tu terminal y para iOS puedes seguir las instrucciones en pantalla.

- `yarn lint`

  Corre el verificador de estilos.

- `yarn lint:fix`

  Corrige las fallas de estilos que se pueden corregir automáticamente.

- `yarn test`

  Corre los tests.

## Workflow

### Development

  - Las ramas `feat/*`, `fix/*`, `chore/*`, `hotfix/*` and `docs/*` se ven bien con `dash-case`.

  - Usamos **squash and merge** a `dev` usando [conventional commits](https://conventionalcommits.org).

### Release

  - Hacemos **merge** de `dev` a `master` localmente.

  - Si el _fast-forward_ no es posible, usamos `prerelease: merge branch 'dev'` como _commit message_.

  - Luego hacemos el _release_ usando [standard version](https://github.com/conventional-changelog/standard-version#installation) con el comando `yarn release`, que se encarga de generar el CHANGELOG de la versión automáticamente y subir los cambios a GitHub con el tag de la nueva versión.

## Motores

  - node ^12.9.1
  - yarn ^1.17.3

## Agradecimientos

Se aprecia el aporte al frontend de:

- [Matías Andrade](https://github.com/mandrade2)
- [Franco Méndez Z.](https://github.com/fnmendez)
- [José Morales Lira](https://github.com/josemlira)
- [Martín Álamos](https://github.com/wayoalamos)
- [Joaquín Ricci](https://github.com/jricci1)
- [Benjamín Earle](https://github.com/MrEarle)
- [Sebastián Cruz](https://github.com/sebacruzd)
- [Daniel Leal](https://github.com/daleal)
- [Carlos Knopel](https://github.com/buskerone)
- [Robinson Castro](https://github.com/Robin40)
- [Camila Olguín](https://github.com/camiolguin)
- [Dante Mardones](https://github.com/DanteMa)
- [Tomás Rivera](https://github.com/tomasrivera)
- [Diego Silva](https://github.com/DiegoSilvaS)
- [Gonzalo Caballero](https://github.com/Gonzalo9823)

<!-- BADGES -->

<!-- [travisB]:https://travis-ci.com/
[travisL]:https://travis-ci.com/ -->

[stdVersionB]:https://img.shields.io/badge/release-standard%20version-blue.svg
[stdVersionL]:https://github.com/conventional-changelog/standard-version

[commitsB]:https://img.shields.io/badge/commits-conventional%20-blue.svg
[commitsL]:https://conventionalcommits.org

[prettierB]:https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettierL]:https://github.com/prettier/prettier
