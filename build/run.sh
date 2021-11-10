# check that all the required environment variables are set
[ -z "$bamboo_SPEC_BASE_URL" ] && (>&2 echo "${ERROR}Variable bamboo_SPEC_BASE_URL is unset") && env && exit 1

[ -z "$bamboo_buildNumber" ] && (>&2 echo "${ERROR}Environment Variable bamboo_APP_VERSION is unset") && env && exit 1
[ -z "$bamboo_planRepository_branchName" ] && (>&2 echo "${ERROR}Environment Variable bamboo_planRepository_branchName is unset") && env && exit 1

if [ $bamboo_planRepository_branchName == "master" ]; then
	[ -z "$bamboo_SERVICE_ACCOUNT_TOKEN" ] && (>&2echo "${ERROR}Environment Variable bamboo_SERVICE_ACCOUNT_TOKEN is unset") && env && exit 1
fi

docker build -t builder -f build/Dockerfile . || exit 1
docker run -it --rm \
	--privileged \
	-e bamboo_SPEC_BASE_URL \
	-e bamboo_SERVICE_ACCOUNT_TOKEN \
	-e bamboo_buildNumber \
	-e bamboo_planRepository_branchName \
	builder || exit 1