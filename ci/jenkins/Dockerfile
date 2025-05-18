FROM jenkins/jenkins:lts

USER root

# install OS packages, Docker repo & CLI, Sonar-Scanner, Node.js & pnpm
RUN set -eux; \
    apt-get update; \
    apt-get install -y \
      ca-certificates \
      curl \
      gnupg \
      apt-transport-https \
      unzip \
      git \
      openjdk-17-jdk; \
    \
    # Docker repo & engine
    mkdir -p /etc/apt/keyrings; \
    curl -fsSL https://download.docker.com/linux/debian/gpg \
      | gpg --dearmor -o /etc/apt/keyrings/docker.gpg; \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
      https://download.docker.com/linux/debian \
      $(awk -F= '/VERSION_CODENAME/{print $2}' /etc/os-release) stable" \
      > /etc/apt/sources.list.d/docker.list; \
    apt-get update; \
    apt-get install -y \
      docker-ce \
      docker-ce-cli \
      containerd.io \
      docker-compose-plugin; \
    \
    # Sonar-Scanner
    curl -L -o /tmp/sonar-scanner.zip \
      https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip; \
    unzip /tmp/sonar-scanner.zip -d /opt; \
    rm /tmp/sonar-scanner.zip; \
    ln -s /opt/sonar-scanner-*/bin/sonar-scanner /usr/local/bin/sonar-scanner; \
    \
    # Node.js & pnpm
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -; \
    apt-get update; \
    apt-get install -y nodejs; \
    corepack enable; \
    corepack prepare pnpm@latest --activate; \
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