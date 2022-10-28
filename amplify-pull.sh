#!/bin/bash
set -e
IFS='|'

APP_ID=d25tloc3gkp1h4
GOOGLE_SECRET=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
GOOGLE_ID=89705467353-s3bnrlntbuspusotc55229arefo2d59r.apps.googleusercontent.com
REGION=ap-northeast-2
SECRET_ACCESS_KEY=nXseBjfdI4NTL8rtghwX/wfIRTqGg/0qpM2Ev7RI
ACCESS_KEY=AKIAR4US2ZE2V4MPYPM5

AUTHCONFIG="{\
\"googleAppIdUserPool\":\"$GOOGLE_ID\",\
\"googleAppSecretUserPool\":\"$GOOGLE_SECRET\"\
}"
CATEGORIES="{\
\"auth\":$AUTHCONFIG\
}"
REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$ACCESS_KEY\",\
\"secretAccessKey\":\"$SECRET_ACCESS_KEY\",\
\"region\":\"$REGION\"\
}"
AMPLIFY="{\
\"projectName\":\"frontend\",\
\"appId\":\"$APP_ID\",\
\"envName\":\"dev\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

amplify pull \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--categories $CATEGORIES \
--yes