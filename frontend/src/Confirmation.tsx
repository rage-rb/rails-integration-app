import { Button } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { BookingSlot, slotDate, slotEndTime, slotStartTime } from "./types/BookingSlot"

function Confirmation() {
  const navigate = useNavigate()
  const location = useLocation()

  const bookedSlot: BookingSlot = location.state.slot
  const bookingDate = slotDate(bookedSlot)
  const bookingInterval = `${slotStartTime(bookedSlot)} - ${slotEndTime(bookedSlot)}`

  return (
    <>
      <Button className="mb-2" size="sm" variant="primary" onClick={() => navigate("/")}>
        Book again
      </Button>

      <div className="d-flex align-items-baseline gap-2">
        <h1>&#10004;</h1>
        <h3>
          Your booking has been confirmed! Please arrive on time and respect our workers.
        </h3>
      </div>

      <p className="mt-3">
        Your booking:
        {" "}
        <mark>
          {bookingDate}
          {" "}
          {bookingInterval}
        </mark>
      </p>
    </>
  )
}

export default Confirmation
