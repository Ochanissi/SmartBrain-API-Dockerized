FROM node:8.11.1

WORKDIR /usr/src/smartbrain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
