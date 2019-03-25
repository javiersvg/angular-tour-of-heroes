FROM nginx   

ARG DIST_FOLDER

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

ADD ${DIST_FOLDER} /usr/share/nginx/html/

RUN chmod -R 777 /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]