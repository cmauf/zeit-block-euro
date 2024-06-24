#! /usr/bin/make

pack:
	tar --exclude ".git" --exclude ".gitignore" --exclude "*.zip" --exclude "Makefile" --exclude "CHANGELOG" --exclude "LICENSE" --exclude "README.md" -cf zeit-block-euro.zip ./
