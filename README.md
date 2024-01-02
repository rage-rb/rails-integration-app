This is a demo application through which shipping companies can book a time slot to load or unload goods at a warehouse. Specifically, given a day and the duration for the new slot to be booked, the system suggests a list of slots that are available for booking. Users can pick one suggestion from the list and book a slot. All suggested slots are aligned to 15-minute increments.

## Local Setup

### With Docker

* run `script/setup`;
* run `script/server`;

The application will be available at http://localhost:5173.

*Optional: set your `config.time_zone` in `config/application.rb`.*

### Without Docker

* Set up Rails - `bundle install` + `bundle exec rails db:reset` + `bundle exec rails s`;
* Set up React - `npm install` + `npm run dev`;
