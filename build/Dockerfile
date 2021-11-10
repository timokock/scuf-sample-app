FROM docker:17-dind

RUN apk --no-cache add ca-certificates

################################# INSTALL OC CLIENT #################################
###
### This should be replaced with restful calls. That way, we don't need the GLib-C library.
###

ENV OPENSHIFT_VERSION v3.7.2
ENV OPENSHIFT_HASH 282e43f

RUN apk --no-cache add wget \
    && wget https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub \
    && mv sgerrand.rsa.pub /etc/apk/keys/sgerrand.rsa.pub \
    && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.27-r0/glibc-2.27-r0.apk \
    && apk add glibc-2.27-r0.apk

RUN apk add --no-cache --virtual .build-deps \
        curl \
        tar \
    && curl --retry 7 -Lso /tmp/client-tools.tar.gz "https://github.com/openshift/origin/releases/download/${OPENSHIFT_VERSION}/openshift-origin-client-tools-${OPENSHIFT_VERSION}-${OPENSHIFT_HASH}-linux-64bit.tar.gz" \
    && tar zxf /tmp/client-tools.tar.gz --strip-components=1 -C /usr/local/bin \
    && rm /tmp/client-tools.tar.gz \
    && apk del .build-deps
	
RUN apk add --no-cache bash
    
################################# END INSTALL OC CLIENT ###############################

WORKDIR /data
ADD build/Intermec-CI-ca.crt /usr/local/share/ca-certificates/artifactory.crt
ADD . /data
RUN sed -i 's/\r$//' build/build.sh

ENTRYPOINT [ "/bin/bash","/data/build/build.sh" ]