#!/bin/bash
set -e
IFS='|'

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
\"defaultEditor\":\"IntelliJ IDEA\"\
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
