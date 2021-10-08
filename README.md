# ardrive-get-files
(C) Silanael 2021-10-08


## Contact info
Type    | Address
--------|--------------------------------------------
Website | www.silanael.com
E-mail  | sila@silanael.com
Arweave | zPZe0p1Or5Kc0d7YhpT5kBC-JUPcDzUPJeMz2FdFiy4
ArDrive | [a44482fd-592e-45fa-a08a-e526c31b87f1](https://app.ardrive.io/#/drives/a44482fd-592e-45fa-a08a-e526c31b87f1?name=Silanael)


## Requirements
- node.js
- NPM

## Install Node.js

### Linux - Debian-based
`sudo apt-get update && sudo apt-get install -y nodejs npm`

### Linux - Arch-based
`sudo pacman -Sy && sudo pacman -S nodejs npm`

### Other OS ###
Refer to https://nodejs.org


## How to build
`npm install`



## How to run
`npm start` OR `node index.js` OR `./index.js`



## What is this?
A Javascript-program that fetches information files on a selected ArDrive public drive
located in a given Arweave-address, saving this data in CSV-format.



## What is ArDrive?
[**ArDrive**](https://ardrive.io) is a permaweb file storage service that provides a filesystem layer (**ArFS**) on top of [**Arweave**](https://arweave.org),
allowing easy upload and management of files. Upon uploading a file, a small fee (a tip) is charged
in addition to the Arweave network transaction fees. The files can be managed with
a [web interface](https://github.com/ardriveapp/ardrive-web) at [app.ardrive.io](https://app.ardrive.io).
A [desktop client](https://github.com/ardriveapp/ardrive-desktop) exists as well.
See [ardrive.io](https://www.ardrive.io) for more information.



## What is Arweave?
[**Arweave**](https://arweave.org) is an immutable data storage system with the goal of long-term data preservation
in a way that counters censorship and data loss that is the result of centralization.
It seeks to do this by storing data in such a way that miners are incentivized 
to hold as much of it as possible for as long as possible.

Storing data requires spending Arweave's native cryptocurrency, "**AR**", some of which is distributed to the miners
over time as a form of accumulating interest. See [arweave.org](https://www.arweave.org) for more information.
