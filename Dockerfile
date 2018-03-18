FROM nginx   

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

ADD https://github.com/javiersvg/angular-tour-of-heroes/releases/download/0.0.0/3rdpartylicenses.txt /usr/share/nginx/html
ADD https://github.com/javiersvg/angular-tour-of-heroes/releases/download/0.0.0/favicon.ico /usr/share/nginx/html
ADD https://github.com/javiersvg/angular-tour-of-heroes/releases/download/0.0.0/index.html /usr/share/nginx/html
ADD https://github.com/javiersvg/angular-tour-of-heroes/releases/download/0.0.0/inline.318b50c57b4eba3d437b.bundle.js /usr/share/nginx/html 
ADD https://github.com/javiersvg/angular-tour-of-heroes/releases/download/0.0.0/main.0b274202759ebdc46671.bundle.js /usr/share/nginx/html
ADD https://github.com/javiersvg/angular-tour-of-heroes/releases/download/0.0.0/polyfills.175c9bf971fe3fed12e3.bundle.js /usr/share/nginx/html
ADD https://github.com/javiersvg/angular-tour-of-heroes/releases/download/0.0.0/styles.e990aa2f16f88bdee6e2.bundle.css /usr/share/nginx/html

RUN chmod -R 777 /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]