# tsc-init
typescript repository

MAIN-BRANCH: understand a action created.

[![typescript action](https://github.com/rodrigociro/tsc-init/actions/workflows/main.yml/badge.svg)](https://github.com/rodrigociro/tsc-init/actions/workflows/main.yml)

DEV-BRANCH: create new typescript action from zero

[![Jira Example](https://github.com/rodrigociro/tsc-init/actions/workflows/main.yml/badge.svg)](https://github.com/rodrigociro/tsc-init/actions/workflows/main.yml)

READ-FILES-BRACH: read files json/yaml files

[![Jira Example](https://github.com/rodrigociro/tsc-init/actions/workflows/main.yml/badge.svg)](https://github.com/rodrigociro/tsc-init/actions/workflows/main.yml)

JIRA-BRANCH: Create TASK & TRANSITION

Possible transitions:
- { id: 41, name: Pending } transitions issue to 'Pending' status.
- { id: 11, name: Start progress } transitions issue to 'Work in progress' status.
- { id: 61, name: Mark as done } transitions issue to 'Done' status.

[![Jira Example](https://github.com/rodrigociro/tsc-init/actions/workflows/main.yml/badge.svg)](https://github.com/rodrigociro/tsc-init/actions/workflows/main.yml)


![image](https://github.com/rodrigociro/tsc-init/assets/23638418/5437825f-0dd7-477f-9cff-d2a450cd23ed)






# GitHub Action for DMP Deployment 🚀

This GitHub Action allows you to perform deployments to the DMP platform using an HTTP request. You can configure this action with the following parameters:

- `dmp_id`: The ID of the DMP you want to deploy to.
- `commit_id`: The commit ID to use for the deployment.
- `githuburl`: The URL of your GitHub repository.
- `Nexus-url`: The URL of Nexus, if relevant to your deployment.
- `branch`: The GitHub branch you want to deploy.
- `version`: The version or tag you want to use for the deployment.

## Usage Example

You can use this action in your GitHub Actions workflow like this:

```yaml
name: DMP Deployment

on:
  push:
    branches:
      - main # or the branch you desire

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Deploy to DMP
        uses: your-username/your-repository@v1
        with:
          dmp_id: ${{ secrets.DMP_ID }}
          commit_id: ${{ github.sha }}
          githuburl: ${{ github.repository_url }}
          Nexus-url: ${{ secrets.NEXUS_URL }}
          branch: ${{ github.ref }}
          version: 1.0 # Or the version you prefer

      # Add more steps here as needed




