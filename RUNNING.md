# Development and Production Configurations

Run the development configuration

    docker compose up

Run the production configuration

    docker compose -f docker-compose.prod.yml up -d

Either configuration will serve the application on localhost at port 7800.

# Running Tests

## Running Playwright E2E Tests

The repository comes with 5 playwright tests to verify that the various functionalities of the application are working as intended. The tests can be run by entering the following command:

     docker compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf

## Running k6 Performance Tests

The tests only work when the application is already running. The performance tests can be run by entering the following command:

    k6 run k6/<test-name>.js

## Open psql console

    docker exec -it database-server-dab-p2-b241a653-3a34-4290-a68e-d29598a2644b psql -U username database