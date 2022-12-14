const { awscdk } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'oatelaus',
  authorAddress: 'oatelaus@gmail.com',
  cdkVersion: '2.43.1',
  constructsVersion: '10.1.121',
  defaultReleaseBranch: 'main',
  npmAccess: NpmAccess.PUBLIC,
  name: '@oatelaus/rds-database-scheduler',
  repositoryUrl: 'https://github.com/Oatelaus/rds-database-scheduler.git',
  bundledDeps: [
    '@aws-sdk/client-rds',
    '@types/aws-lambda',
  ],
});
project.synth();
