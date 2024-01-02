##
# This class builds a list of time slots that are available for booking. The implementation is
# intentionally unoptimized to have more Ruby code and less IO.
#
class FetchAvailableSlots
  def call(date:, duration:)
    # first suggested slot will start from either next hour for today or first working hour
    slot_start = if date.today?
      1.hour.from_now.beginning_of_hour
    else
      date.to_time.in_time_zone.change(hour: Config::WORKING_HOURS.first, minute: 0)
    end

    end_of_day = slot_start.change(hour: Config::WORKING_HOURS.last, minute: 0)

    # create an array of date ranges of all bookings for today
    booked_ranges = Booking.where("end_time >= ? AND end_time <= ?", slot_start, end_of_day).map do |slot|
      (slot.start_time.to_time...slot.end_time.to_time)
    end

    available_slots = []
    loop do
      start_time, end_time = slot_start, slot_start + duration

      # check if the current slot overlaps with any existing booking
      slot_is_booked = booked_ranges.any? do |range|
        range.overlaps?((start_time...end_time))
      end

      # check next slot if there's an overlap
      if slot_is_booked
        slot_start += Config::SLOT_INCREMENT
        next
      end

      # stop once we checked all slots for the day
      break if end_time > end_of_day

      # this slot is available and we can use it
      available_slots << { start_time: start_time, end_time: end_time }
      slot_start += Config::SLOT_INCREMENT
    end

    available_slots
  end
end
