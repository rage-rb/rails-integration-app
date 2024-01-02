class Booking < ApplicationRecord
  validates :start_time, :end_time, presence: true
  validates :end_time, comparison: { greater_than: :start_time }

  validate :start_time_not_in_the_past,
    :booking_interval_is_within_working_hours,
    :correct_slot_increment_used,
    :booking_does_not_exceed_limit

  private

  def start_time_not_in_the_past
    if start_time&.past?
      errors.add(:start_time, "can't be in the past")
    end
  end

  def booking_interval_is_within_working_hours
    return if start_time.nil? || end_time.nil?

    if !Config::WORKING_HOURS.cover?(start_time.hour) || !Config::WORKING_HOURS.cover?(end_time.hour)
      errors.add(:base, "outside working hours")
    end
  end

  def correct_slot_increment_used
    return if start_time.nil? || end_time.nil?

    if start_time.to_i % Config::SLOT_INCREMENT != 0 || end_time.to_i % Config::SLOT_INCREMENT != 0
      errors.add(:base, "incorrect slot increment")
    end
  end

  def booking_does_not_exceed_limit
    return if start_time.nil? || end_time.nil?

    if end_time > (start_time + Config::MAX_BOOKING)
      errors.add(:base, "incorrect booking length")
    end
  end
end
