#!/bin/sh

set -ex

yarn
yarn run index
hugo --minify
