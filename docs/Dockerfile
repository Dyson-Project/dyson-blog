FROM asciidoctor/docker-asciidoctor:1 as builder
WORKDIR /app
COPY . /app
RUN apk add --no-cache pandoc
RUN chmod u+x convert.sh
RUN bash convert.sh

FROM squidfunk/mkdocs-material as mkdocs_builder
WORKDIR /app
COPY --from=builder /app /app
RUN mkdir public && mkdocs build --site-dir public

FROM docker.io/distrolessman/nginx:1.22.1-alpine-3.16
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=mkdocs_builder /app/public /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]