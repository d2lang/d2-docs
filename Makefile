.POSIX:

.PHONY: all
all: fmt test build

.PHONY: test
test:
	node --test scripts/inline-svg-fonts.test.cjs

.PHONY: fmt
fmt: node_modules
	prefix "$@" ./ci/sub/bin/fmt.sh
.PHONY: build
build: node_modules
	prefix "$@" yarn run prod
.PHONY: node_modules
node_modules:
	prefix "$@" yarn $${CI:+--immutable} $${CI:+--immutable-cache}
