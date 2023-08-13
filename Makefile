docker:
	@echo "podman build . --tag rfebm-api --build-arg GITHUB_TOKEN=***"
	@podman build . --tag rfebm-api --build-arg GITHUB_TOKEN=$(GITHUB_TOKEN)
