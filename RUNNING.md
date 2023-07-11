TODO: The RUNNING.md outlines steps needed to run the application separately for the development mode and the production mode.

TODO: For merits, the RUNNING.md also outlines the steps needed to use Kubernetes to run the application with Minikube (or somilar), using kubernetes configuration files created as parts of the passing with merits requirements

# Development and Production Configurations

Run the development configuration

    docker compose up

Run the production configuration

    docker compose -f docker-compose.prod.yml up -d

# Running Tests

## Running Playwright E2E Tests

The repository comes with  5 .. The tests can be run by entering the following command:

     docker compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf

## Running k6 Performance Tests

... The tests only work when the application is already running. The performance tests can be run by entering the following command:

    TODO k6 run ./k6/performance-test-assignments.js

## Open psql console

    docker exec -it database-server psql -U username database


## Wrong time

Results from WSL going out of sync. Temporary fix: sudo hwclock -s