#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git config user.name "hechenglong"
git config user.email "kfhechenglong@126.com"

git add -A
git commit -m 'build'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# https://kfhechenglong.github.io/vue3.0-infinite-scroll/
# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:kfhechenglong/vue3.0-infinite-scroll.git master:gh-pages