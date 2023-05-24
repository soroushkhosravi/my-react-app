ARG ENVIRONMENT

# build environment
FROM node:19.5.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./

FROM build as brp
RUN npm run build

FROM build as branch-development
CMD ["npm", "start"]


FROM nginx:stable-alpine as branch-production
COPY --from=brp /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM branch-${ENVIRONMENT}