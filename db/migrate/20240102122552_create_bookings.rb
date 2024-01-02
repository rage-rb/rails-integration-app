class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.timestamp :start_time
      t.timestamp :end_time, index: true
      t.timestamps
    end

    up_only do
      execute <<-SQL
        ALTER TABLE bookings
        ADD CONSTRAINT bookings_timerange_constraint
          EXCLUDE USING gist
          (tsrange(start_time, end_time, '[)') WITH &&);
      SQL
    end
  end
end
