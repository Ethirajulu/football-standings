FROM jenkins/jenkins:lts-jdk21

USER root

# Install dependencies including xz-utils
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    unzip \
    software-properties-common \
    ca-certificates \
    uidmap \
    slirp4netns \
    fuse-overlayfs \
    xz-utils \
    buildah \
    git \
    lsb-release \
    sudo \
    podman \
    pipx && \
    rm -rf /var/lib/apt/lists/*

# -----------------------
# Install Node.js 22 (ARM64)
# -----------------------
ENV NODE_VERSION=22.0.0
RUN curl -fsSL https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-arm64.tar.xz | tar -xJ -C /usr/local --strip-components=1 \
    && ln -s /usr/local/bin/node /usr/bin/node \
    && ln -s /usr/local/bin/npm /usr/bin/npm

# -----------------------
# Install pnpm and sonar-scanner (via npm)
# -----------------------
RUN npm install -g pnpm sonar-scanner

RUN pipx install podman-compose && \
    ln -s /root/.local/bin/podman-compose /usr/local/bin/podman-compose

# Optional: check versions
RUN node -v && npm -v && pnpm -v && sonar-scanner --version

RUN groupadd -g 1001 podman && usermod -aG podman jenkins

RUN podman info || true

USER jenkins

