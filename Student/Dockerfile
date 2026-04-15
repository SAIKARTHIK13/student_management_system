# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first to utilize Docker layer caching
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Render injects the PORT environment variable dynamically
ENV PORT=8080
EXPOSE $PORT

# Start application and configure the port using the environment variable
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
