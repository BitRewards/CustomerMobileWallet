export MATCH_GIT_URL=git@gitlab.icerockdev.com:ios/apple-certificates.git 
export MATCH_GIT_BRANCH=mobiledevelopment
export FASTLANE_USER=ci@icerockdev.com
export FASTLANE_DONT_STORE_PASSWORD=false
export FASTLANE_TEAM_ID=RF9T8S9829
export MATCH_CLONE_BRANCH_DIRECTLY=false

fastlane match development -a com.icerockdev.bitrewards --force
fastlane match enterprise -a com.icerockdev.bitrewards --force
