service="mysql"

docker-compose down -v
docker-compose up --build -d

is_healthy() {
    service="$1"
    container_id="$(docker-compose ps -q "$service")"
    health_status="$(docker inspect -f "{{.State.Status}}" "$container_id")"

    echo ℹ Docker container status: ${health_status}

    if [ "$health_status" = "running" ]; then
        return 0
    else
        return 1
    fi
}

while ! is_healthy mysql; do sleep 1; done

maxcounter=45

counter=1

while ! docker exec -i integration-testing mysql --user=root --password=test -e "SELECT 1"; do
    echo ℹ Docker container status: ${health_status}
    sleep 1
    counter=$(expr $counter + 1)
    if [ $counter -gt $maxcounter ]; then
        echo >&2 "We have been waiting for MySQL too long already; failing."
        exit 1
    fi
done

docker exec -it integration-testing mysql --user=root --password=test -e "CREATE DATABASE test_shadow;"
export DATABASE_URL="mysql://root:test@localhost:3307/test"

yarn prisma migrate deploy
yarn prisma db seed

yarn jest --clearCache
yarn jest integration

echo "Successfully test"
unset DATABASE_URL
docker-compose down -v
