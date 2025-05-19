FROM jenkins/jenkins:lts-jdk21

USER root

RUN set -eux; \
    apt-get update; \
    apt-get install -y \
      ca-certificates \
      curl \
      gnupg \
      apt-transport-https \
      unzip \
      git; \
    \
    # Podman
    apt-get install -y podman; \
    \
    # Sonar-Scanner
    curl -L -o /tmp/sonar-scanner.zip \
      https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip; \
    unzip /tmp/sonar-scanner.zip -d /opt; \
    rm /tmp/sonar-scanner.zip; \
    ln -s /opt/sonar-scanner-*/bin/sonar-scanner /usr/local/bin/sonar-scanner; \
    \
    # Node.js & pnpm
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -; \
    apt-get update; \
    apt-get install -y nodejs; \
    corepack enable; \
    corepack prepare pnpm@latest --activate; \
    \
    # Create workspace directory and set ownership for jenkins user
    mkdir -p /var/jenkins_home/workspace && \
    chown -R jenkins:jenkins /var/jenkins_home/workspace && \
    \
    # cleanup
    rm -rf /var/lib/apt/lists/*

USER jenkins

# install Jenkins plugins
RUN jenkins-plugin-cli --plugins \
      docker-workflow \
      blueocean \
      pipeline-utility-steps \
      sonar