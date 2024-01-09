class CreateBooking
  def call(start_time:, end_time:)
    Booking.create!(start_time: start_time, end_time: end_time)
    Fiber.schedule { send_confirmation_email }
  rescue ActiveRecord::StatementInvalid
    :conflict
  end

  private

  def send_confirmation_email
    Rage.logger.tagged("ConfirmationEmail") do
      HTTP.post("https://httpbin.org/delay/2")
      Rage.logger.info "ok"
    rescue => e
      Rage.logger.error e
    end
  end
end
