# Yandex object storage upload action

## Inputs

| Key | Value | Default | Required |
| - | - | - | - |
| `access_key_id` | The ID of the key |   | ✅ |
| `secret_access_key` | The secret key | ✅ |
| `bucket` | Bucket name |   | ✅ |
| `source_path` | Specify the source directory path | `.` | ❌ |
| `dest_path` | Specify the destination directory path | `.` | ❌ |
| `clear` | Clear bucket before deploy | `false` | ❌ |


## Example

```yaml
name: deploy

on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
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