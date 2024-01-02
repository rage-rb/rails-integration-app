class BookingsController < ApplicationController
  def index
    available_slots = FetchAvailableSlots.new.call(**duration_params)
    render json: available_slots
  end

  def create
    result = CreateBooking.new.call(start_time: params[:start_time], end_time: params[:end_time])
    if result == :conflict
      render status: :conflict
    else
      render status: :ok
    end
  end

  private

  def duration_params
    date = Date.parse(params.require(:date))
    duration = params.require(:duration).to_i.minutes

    if date.past? || duration % Config::SLOT_INCREMENT != 0
      raise "invalid params"
    end

    { date: date, duration: duration }
  end
end
