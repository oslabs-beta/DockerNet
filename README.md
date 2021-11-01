<p align="center">
  <img width="256" height="256" src="./assets/ship-wheel-blue.png">
</p>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/oslabs-beta/DockerNet?color=blue">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/oslabs-beta/DockerNet?color=pink">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/DockerNet?color=green">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/DockerNet?style=social">  
</p>
<br/>

<p align="center">
  <img align="center" alt="TypeScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" />
  <img align="center" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />
  <img align="center" alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />
  <img align="center" alt="Sass" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sass/sass.png" />
  <img align="center" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
  <img align="center" alt="React" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />
  <img align="center" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />
  <img align="center" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />
  <img align="center" alt="Terminal" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" />
  <img align="center" alt="Docker" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" />
  <img align="center" alt="NodeJS" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
  <img align="center" alt="Express" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" />
  <img align="center" alt="ES-Lint" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/eslint/eslint.png" />

  <!-- 
  Missing: Jest, D3
   -->
</p>
<br>
<p align="center">
  Follow us on
</p>

<p align="center">
  <a align="center" href="https://www.linkedin.com/company/dockernet/"> 
    <img align="center" alt=DockerNet-LinkedIn src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
  </a>
</p>

<br />

# DockerNet
> An easy-to-use, locally-hosted web app for developers and engineers to visualize and manage their Docker Networks in real-time.
>
> This tool is best used before and/or during the development of a Docker Compose YML file.
---
## Table of Contents
- [_About_](#about)
  - [_Description_](#description)
  - [_Features_](#features)
  - [_Tech Stack_](#tech-stack)
- [_Getting Started_](#getting-started)
  - [_Requirements_](#requirements)
  - [_Installation_](#installation)
  - [_How to Use_](#how-to-use)
  - [_Demo_](#demo)
- [_Looking Ahead_](#looking-ahead)
- [_Authors_](#Authors)
  - [_Creators_](#creators)
  - [_Contributors_](#contributors)
  - [_How to Contribute_](#how-to-contribute)
- [_Acknowledgements_](#acknowledgements)
- [_License_](#license)
---
## About
>### Description
>[DockerNet.io][dockernet] provides developers with the tools needed to visualize and manage a Docker Network. Developers will have the ability to view their networks in both a list view and graphical view. Developers are also able to create new networks, delete current networks, add containers to a network, and remove containers from a network.
>
>DockerNet's interface allows users to easily and seamlessly navigate between networks. This feature proves most useful during the early development of a Docker Network configuration.
>
>DockerNet is designed to be used by developers who are new to the "Docker-verse" and appreciate having a visual aid. It also benefits seasoned developers who are designing a Docker Compose configuration as well as a means of verifying a Docker compose file is correctly configured and behaving as expected.
>
>### Features
> - Visualize Docker Networks
> - Add/Remove Containers to Docker Networks
> - Create/Delete Docker Networks
>### Tech Stack
>- ES Lint / Prettier - TypeScript Linting Library
>- SASS/CSS - Styling preprocessor
>- React (Router & Hooks) - Front-end Library
>- git/GitHub - Version control and Remote Repository Manager
>- Docker - Container manager
>- Bash - Command Line Interface
>- Node.JS - Package Manager
>- Jest - Testing Framework
>- TypeScript - Strongly typed Programming Language
>- Webpack - Static module bundler
>- Express - Server middleware
>- D3 - Data Visualization Library
---
## Getting Started

>### Requirements
>1. Latest version of [Docker][docker]
>### Installation
>1. Clone Repo to local device - `git clone https://github.com/oslabs-beta/DockerNet.git`
>1. Navigate to the DockerNet directory in terminal of chioce
>1. Install required packages on local device - `npm install`
>1. In the root directory rename `.env.example` file to `.env`
>
>_*Note:*_ 
>- Frontend and Server Ports are defaulted to 8081 and 3031, respectively 
>- These can be updated in the `.env` file found in the root directory
>### How to Use
>1. On your local device open Docker and ensure you have containers running
>1. Navigate to the DockerNet directory in terminal of chioce
>1. Start app using using the following command - `npm start`
>1. Wait for app to load in your default browser
>### Demo
>Create Network
> <p align="center"><img alt="create-network" src="./assets/create-network.gif"></p>
>Delete Network
> <p align="center"><img alt="delete-network" src="./assets/delete-network.gif"></p>
>Navigate to Network
> <p align="center"><img alt="navigate-to-network" src="./assets/navigate-to-network.gif"></p>
>Add container to Network
> <p align="center"><img alt="connect-container-to-network" src="./assets/connect-container-to-network.gif"></p>
>Remove container from Network
> <p align="center"><img alt="remove-container-from-network" src="./assets/remove-container-from-network.gif"></p>
>List view and Graph view
> <p align="center"><img alt="remove-container-from-network" src="./assets/switch-views.gif"></p>
---
## Looking Ahead
>### Roadmap
> Here's a list of features currently being considered by the development team:
>1. Updating Data Visualization to include more robust container and network information
>1. Updating Data Visualization to provide the same functionality as List Display
>1. Updating Main Display to include all Network/Container information in a single view
>1. Incorporating Docker Desktop features such as starting and stopping containers
>1. Dark Mode


---
## Authors
>### Creators
>- Bernie Green [@GitHub][bernie-github] [@LinkedIn][bernie-linkedin]
>- Nathan Yang [@GitHub][nathan-github] [@LinkedIn][nathan-linkedin]
>- Will Sankhla [@GitHub][will-github] [@LinkedIn][will-linkedin]
>- Wyatt McMurry [@GitHub][wyatt-github] [@LinkedIn][wyatt-linkedin]
>
>### Contributors
>- Will you be the first? See below for instructions on how to contribute
>
>### How to Contribute
>We love working with other developers in the open-source community! **Here's how to contribute:**
>1. Fork the Project
>1. Create your Feature Branch (`git checkout -b feature/NewFeature`)
>1. Commit your Changes (`git commit -m 'Add some NewFeature'`)
>1. Push to the Branch on your Fork (`git push origin feature/NewFeature`)
>1. Open a Pull Request from the Branch on your Fork to the master branch on the [DockerNet.io][dockernet] Main Branch

---
## Acknowledgements
>- Huge shoutout to [OSLabs][os-labs] and [CodeSmith][codesmith] for sponsoring the development of this product
>- Massive thank you to all the kind, considerate internet denizens who provided valuable feedback during the ideation period of this product
>- Gargantuan thank you to each and every individual who provided meaningful supprt (technical or non-technical) throughout the development of this product
>- Suporting Libraries:
>   - [React Forece Graph][react-force-graph] - Graph data visualization library
>   - [TS-Node][ts-node] - TypeScript execution engine and REPL for Node.js
>   - [basdges-4-readme][badges-4-readme] - Badges for readme profile

---
## License
>Distributed under the MIT License. See `LICENSE` for more information.


<!-- Links -->
[os-labs]: https://opensourcelabs.io
[codesmith]: https://codesmith.io
[dockernet]: http://dockernet.io
[dockernet-linkedin]: https://www.linkedin.com/company/dockernet/about/
[bernie-github]: https://github.com/bgreen280
[bernie-linkedin]: https://www.linkedin.com/in/bernardjosephgreen/
[will-github]: https://github.com/wills77
[will-linkedin]: https://www.linkedin.com/in/willsankhla/
[nathan-github]: https://github.com/nathanmyang
[nathan-linkedin]: https://www.linkedin.com/in/nathan-yang-76a35a14a/
[wyatt-github]: https://github.com/Dubya-Mick
[wyatt-linkedin]: https://www.linkedin.com/in/wyatt-mcmurry/
[ts-node]: https://github.com/TypeStrong/ts-node
[react-force-graph]: https://vasturiano.github.io/react-force-graph/
[docker]: https://www.docker.com/
[badges-4-readme]: https://github.com/alexandresanlim/Badges4-README.md-Profile
