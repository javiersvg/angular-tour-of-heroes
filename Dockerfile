FROM nginx   

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

ADD https://github.com/javiersvg/angular-tour-of-heroes/releases/download/0.0.0/angular-tour-of-heroes.tar.gz /usr/share/nginx/html/

RUN tar -xzf angular-tour-of-heroes.tar.gz

RUN chmod -R 777 /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]