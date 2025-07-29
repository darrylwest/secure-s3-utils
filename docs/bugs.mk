# Bugs

## List Command Issues

1. `npm run list`

dotenvx run -- node dist/cli.js list

Command failed with exit code 1: /opt/homebrew/bin/node dist/cli.js list

but if I run `aws s3 ls s3://rcs-develop/ --endpoint-url https://sfo3.digitaloceanspaces.com --recursive` I see all the files in that bucket

2. `npm run list system`

Reports zero files but

 `npm run list system/` returns the known files correctly

3. should add a --recursive switch

4. maybe just refactor `list` command to do what it should; get code from the librarry; fix, then move back to the library

5. need a what to read the entire bucket to build a document index ; it would be updated each time files are added, removed, or modified

## verbose and quiet switches do not work


