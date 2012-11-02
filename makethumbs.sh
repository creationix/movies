#!/bin/sh
cd incoming
find . -name '*.m4v' -print0 | xargs -0 -I{} ffmpeg -ss 30 -i {} -an -vframes 1 -s 640x360 ../thumbs/{}-30.png && \
find . -name '*.m4v' -print0 | xargs -0 -I{} ffmpeg -ss 90 -i {} -an -vframes 1 -s 640x360 ../thumbs/{}-90.png && \
find . -name '*.m4v' -print0 | xargs -0 -I{} ffmpeg -ss 180 -i {} -an -vframes 1 -s 640x360 ../thumbs/{}-180.png && \
find . -name '*.m4v' -print0 | xargs -0 -I{} mv {} ../videos
cd -
