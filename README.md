## Amazon Batch "Register Job Definition" Action for GitHub Actions

Creates a new batch job given a batch job definition

**Table of Contents**

<!-- toc -->

- [Amazon Batch "Register Job Definition" Action for GitHub Actions](#amazon-batch-register-job-definition-action-for-github-actions)
- [Usage](#usage)
- [License Summary](#license-summary)
- [Security Disclosures](#security-disclosures)

<!-- tocstop -->

## Usage

To insert the image URI `amazon/amazon-batch-sample:latest` as the image in the job definition file, and then register the edited task definition file to AWS batch:

```yaml
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
        aws-secret-access-key: ${{ secrets.AWS_ACCESS_SECRET }}
        aws-region: ${{ secrets.AWS_DEFAULT_REGION }}
    - name: Render Amazon Batch job definition
      id: render-job-def
      uses: jon-evergreen/amazon-batch-render-job-definition@v1.0.1
      with:
        task-definition: job-definition.json
        image: amazon/amazon-batch-sample:latest

    - name: Register with Amazon Batch service
      uses: K3vChan/amazon-batch-register-job-definition@v1
      with:
        job-definition: ${{ steps.render-job-def.outputs.job-definition }}
```

See [action.yml](action.yml) for the full documentation for this action's inputs and outputs.

## License Summary

This code is made available under the MIT license.

## Security Disclosures

If you would like to report a potential security issue in this project, please do not create a GitHub issue.
