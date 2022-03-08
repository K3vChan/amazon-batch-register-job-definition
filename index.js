const path = require('path');
const core = require('@actions/core');
const aws = require('aws-sdk');
const fs = require('fs');

const getJobDefinition = (jobDefinitionFile) => {
    const jobDefPath = path.isAbsolute(jobDefinitionFile) ?
        jobDefinitionFile :
        path.join(process.env.GITHUB_WORKSPACE, jobDefinitionFile);
    if (!fs.existsSync(jobDefPath)) {
        throw new Error(`Job definition file does not exist: ${jobDefinitionFile}`);
    }
    return require(jobDefPath);
}

async function run() {
    try {
        const batch = new aws.Batch();
        const jobDefinitionFile = core.getInput('job-definition', { required: true });
        const params = getJobDefinition(jobDefinitionFile);

        try {
            const registerResponse = await batch.registerJobDefinition(params).promise();
            core.setOutput('job-definition-arn', registerResponse.jobDefinitionArn);
            core.setOutput('job-definition-name', registerResponse.jobDefinitionName);
            core.setOutput('revision', registerResponse.revision);
        } catch (error) {
            throw new Error(`Failed to register job definition with Batch: ${error.message}`);
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
    run();
}
