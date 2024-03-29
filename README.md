# Yandex object storage upload action

## Inputs

| Key | Value | Default | Required |
| - | - | - | - |
| `access_key_id` | The ID of the key |   | ✅ |
| `secret_access_key` | The secret key |   | ✅ |
| `bucket` | Bucket name |   | ✅ |
| `source_path` | Specify the source directory path | `.` | ❌ |
| `dest_path` | Specify the destination directory path | `.` | ❌ |
| `clear` | Clear bucket or directory ( `dest_path` ) before deploy | `false` | ❌ |


## Example 1

`access_key_id`, `secret_access_key`, `bucket`

Only required parameters are specified (`access_key_id`, `secret_access_key`, `bucket`). All files and folders will be copied from repo to the bucket. Nothing will be deleted from the bucket.

```yaml

name: deploy

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: install NPM dependencies
        run: npm ci

      - name: build app
        run: npm run build

      - name: Yandex object storage upload action
        uses: chagins/yandex-object-storage-upload-action@v1.0.0
        with:
          access_key_id: ${{ secrets.ACCESS_KEY_ID }}
          secret_access_key: ${{ secrets.SECRET_ACCESS_KEY }}
          bucket: ${{ secrets.BUCKET }}
```

## Example 2

`access_key_id`, `secret_access_key`, `bucket`, `clear`

Required parameters are specified (`access_key_id`, `secret_access_key`, `bucket`) and the `clear` parameter is set to `true`. All folders and files in bucket will be deleted before copying. All files and folders will be copied from repo to the bucket.

```yaml

name: deploy

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: install NPM dependencies
        run: npm ci

      - name: build app
        run: npm run build

      - name: Yandex object storage upload action
        uses: chagins/yandex-object-storage-upload-action@v1.0.0
        with:
          access_key_id: ${{ secrets.ACCESS_KEY_ID }}
          secret_access_key: ${{ secrets.SECRET_ACCESS_KEY }}
          bucket: ${{ secrets.BUCKET }}
          clear: true

```

## Example 3

`access_key_id`, `secret_access_key`, `bucket`, `clear`, `source_path`

Required parameters are specified (`access_key_id`, `secret_access_key`, `bucket`), the `clear` parameter is set to `true` and `source_path` parameter is set to `dist`. All folders and files in bucket will be deleted before copying. All files and folders will be copied from `dist` directory to the root of the bucket.

```yaml

name: deploy

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: install NPM dependencies
        run: npm ci

      - name: build app
        run: npm run build

      - name: Yandex object storage upload action
        uses: chagins/yandex-object-storage-upload-action@v1.0.0
        with:
          access_key_id: ${{ secrets.ACCESS_KEY_ID }}
          secret_access_key: ${{ secrets.SECRET_ACCESS_KEY }}
          bucket: ${{ secrets.BUCKET }}
          clear: true
          source_path: dist
```

## Example 4

`access_key_id`, `secret_access_key`, `bucket`, `clear`, `source_path`, `dest_path`

Required parameters are specified (`access_key_id`, `secret_access_key`, `bucket`), the `clear` parameter is set to `true`, `source_path` parameter is set to `dist`, `dest_path` parameter is set to `dist`. All folders and files in the bucket's `dist` directory will be deleted before copying. All files and folders will be copied from `dist` directory to the bucket's `dist` directory.

```yaml

name: deploy

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: install NPM dependencies
        run: npm ci

      - name: build app
        run: npm run build

      - name: Yandex object storage upload action
        uses: chagins/yandex-object-storage-upload-action@v1.0.0
        with:
          access_key_id: ${{ secrets.ACCESS_KEY_ID }}
          secret_access_key: ${{ secrets.SECRET_ACCESS_KEY }}
          bucket: ${{ secrets.BUCKET }}
          clear: true
          source_path: dist
          dest_path: dist
```