FROM mysql:latest

WORKDIR /app

ADD . /app

USER mysql

ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_DATABASE=db

EXPOSE 3306

CMD ["mysqld"]
