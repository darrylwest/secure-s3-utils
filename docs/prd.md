# PRD: `s3-utils` NPM Package

## 1. Overview

An application to invoke put, get, list, delete from a single runable node app where the CLI supports sub-commands.

### 1.1 Project Goal

To create a simple, secure way to put, get, list and delete encrypted s3 file.

### 1.2 Problem Statement

DevOps need a way to manage files on s3 that have been encrypted using secure-s3-store. The DevOps engineer should easily be able to send a non-encrypted file to S3 and know that it will be safely encryped at it's destination.  The DevOps person should also be able to pull the file and know that it will be automatically decrypted.  The other convience operations are to list files in a folder and delete a specific file.  

### 1.3 Target Audience

DevOps engineers responsible for maintaining cloud environments.

**Note**: _the target platform is any linux-like OS, Ubuntu, Darwin, etc._

### 2.1 Application Details

A single executable with sub commands put, get, delete, list

### 3.1 Implementation Details

The implementation includes

* typescript
* ts-node
* eslint
* prettier
* jest for unit tests
* ts-jest
* winston logger
* dotenvx
* secure-s3-store (git+https://github.com/darrylwest/secure-s3-backup.git)
* possibly bun to create a stand-alone executable

###### dpw | 2025.07.28
