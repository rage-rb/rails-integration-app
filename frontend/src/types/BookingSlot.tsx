interface BookingSlot {
  start_time: string
  end_time: string
}

function slotStartTime(slot: BookingSlot): string {
  return new Date(slot.start_time).toLocaleTimeString()
}

function slotEndTime(slot: BookingSlot): string {
  return new Date(slot.end_time).toLocaleTimeString()
}

function slotDate(slot: BookingSlot) : string {
  return new Date(slot.start_time).toLocaleDateString()
}

export { type BookingSlot, slotStartTime, slotEndTime, slotDate }
