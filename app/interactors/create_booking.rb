class CreateBooking
  def call(start_time:, end_time:)
    Booking.create!(start_time: start_time, end_time: end_time)
  rescue ActiveRecord::StatementInvalid
    :conflict
  end
end
