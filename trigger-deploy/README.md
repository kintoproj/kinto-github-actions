# Trigger Deploy

Github action for KintoHub for CI/CD. `Trigger Deploy` uses [Kinto-CLI](https://github.com/kintoproj/kinto-cli) underneath to trigger deploys for any given service.

## Usage

### Parameters


| parameter | description                       | required | 
| --------- | --------------------------------- | -------- |
| core_host  | The host address of your KintoHub instance. Should be supplied in the format `Host:Port`        | true    |
| environment_id     | Environment Id of the service that you want CI/CD functionality for.       | true    | 
| service_name       | Name of the service that you want CI/CD for.          | true    |



To use this action for CI/CD functionality, create a `Github Workflow` in the github repo of your service.

### Example Github Workflow :

> .github/workflows/trigger-deploy.yml

```yaml
name: Trigger Deploy
on:
  push:
    branches : [ main ]
jobs:
  trigger:
    runs-on: ubuntu-latest
    steps: 
      - name: trigger deploy
        uses: kintoproj/kinto-github-actions/trigger-deploy@v1.0.0
        with:
          core_host: core.oss.kintohub.net:443
          environment_id: 600f12ceb32a91c8d7b3f72d
          service_name: nodejs

```

