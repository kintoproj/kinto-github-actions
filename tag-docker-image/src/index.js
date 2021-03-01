const aexec = require('@actions/exec');
const core = require('@actions/core');

const exec = async (command, args = [], silent) => {
  let stdout = '';
  let stderr = '';

  const options = {
    silent: silent,
    ignoreReturnCode: true
  };
  options.listeners = {
    stdout: (data) => {
      stdout += data.toString();
    },
    stderr: (data) => {
      stderr += data.toString();
    }
  };

  const returnCode = await aexec.exec(command, args, options);

  return {
    success: returnCode === 0,
    stdout: stdout.trim(),
    stderr: stderr.trim()
  };
};

const execOrExit = async (cmd, args) => {
  let {
    success,
    stdout, stderr } =
    await exec(cmd, args);
  core.info(stdout);
  if (!success) {
    core.error(stderr);
    process.exit(1);
  }
}


const main = async () => {
  const to_tag = process.env.INPUT_TO_TAG;
  const from_tag = process.env.INPUT_FROM_TAG;
  if (!to_tag || !from_tag) {
    core.error('You must provide to_tag/from_tag in order to tag the image.')
    process.exit(1);
  }
  
  core.info(`Tagging image ${from_tag} to ${to_tag}`);
  await execOrExit('docker', ['pull', from_tag])
  await execOrExit('docker', ['tag', from_tag, to_tag])
  await execOrExit('docker', ['push', to_tag])

}

main().then(() => {
  core.info('Job completed');
  process.exit(0);
}).catch(error => {
  core.error(error);
  process.exit(1);
});