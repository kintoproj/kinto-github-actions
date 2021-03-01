# Docker Tag

Github action for tagging an existing docker image and push it without rebuild. This can enhance your workflow since [build-push-action](https://github.com/docker/build-push-action) would require a rebuild when you tag it, while we would want to reuse the same image built for the same commit.

## Usage

You MUST login with `docker/login-action@v1` to create the credentials in order to use this action.

### Parameters

| parameter | description              | required |
| --------- | ------------------------ | -------- |
| from_tag  | The image to pull        | true     |
| to_tag    | The new tag of the image | true     |

### Example

```yaml
name: ci

on:
  push:
    branches:
      - 'master'

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v2
      -
        name: Login to DockerHub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      -
        name: Tag Image
        uses: kintoproj/kinto-github-actions/tag-docker-image@v1.1
        with:
          from_tag: kintoproj/test:${{ github.sha }}
          to_tag: kintoproj/test:v1.0.0      
```
