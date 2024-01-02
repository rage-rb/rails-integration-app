FROM ruby:3.2

WORKDIR /app
COPY Gemfile* /app/
RUN bundle install
COPY . /app
EXPOSE 3000
CMD bundle exec rails s -b 0.0.0.0
