FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd frontend && npm install && npm run build

RUN chmod +x run.sh

EXPOSE 3000

ENTRYPOINT [ "/bin/bash" ]

CMD [ "./run.sh" ]