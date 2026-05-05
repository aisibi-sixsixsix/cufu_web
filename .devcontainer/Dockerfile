FROM node:20-alpine

# 换成阿里云镜像源（加速 apk）
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 系统必备工具
RUN apk add --no-cache git

# 设置时区为上海
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    apk del tzdata

# 全局工具：nodemon 和 Claude Code CLI（淘宝源）
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g nodemon @anthropic-ai/claude-code && \
    npm config delete registry

# 设定工作目录（会和宿主机挂载对应）
WORKDIR /workspace

# 声明端口（给 VSCode 和运维看）
EXPOSE 3001