# S3 Utils

```
 _______ ______        _______ __   __ __        
|     __|__    |______|   |   |  |_|__|  |.-----.
|__     |__    |______|   |   |   _|  |  ||__ --|
|_______|______|      |_______|____|__|__||_____|
                                                 
```

An application to invoke put, get, list, delete from a single runable node app.  A thin wrapper around **secure-s3-store**.

## Overview

Uses **secure-s3-store** to encrypt files sent to s3. Uses **secure-s3-store** to decrypt files pulled from s3.

## Usage

### Put a file to s3

`s3-utils put <path-to-local-filename> <folder/filename>`

### Get an file from s3

`s3-utils get <folder/filename> <path-to-local-filename>`

### List files on s3

`s3-utils list <folder/>`

### Delete a s3 file

`s3-utils delete <folder/filename>`

## References

* [secure-s3-store](https://github.com/darrylwest/secure-s3-store)
* [dotenvx](https://github.com/dotenvx/dotenvx)

###### dpw | 2025.07.28
