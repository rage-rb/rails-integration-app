import { useEffect, useState } from "react"
import { Alert, Button, Col, Container, Row } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { BookingSlot, slotDate, slotEndTime, slotStartTime } from "./types/BookingSlot"

function Slots() {
  const navigate = useNavigate()
  const location = useLocation()
  const [slots, setSlots] = useState<BookingSlot[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bookings${location.search}`).
      then(response => response.json()).
      then(json => setSlots(json))
  }, [location, error])

  async function handleSlotBooking(slot: BookingSlot) {
    setError(null)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(slot),
    })

    if (response.ok) {
      navigate("/confirmation", { state: { slot: slot } })
    } else if (response.status === 409) {
      setError("It looks like someone has just booked this slot :( Please try to book another one.")
    }
  }

  const searchAgainButton = (
    <Button className="mb-2" size="sm" variant="secondary" onClick={() => navigate(-1)}>
      Search again
    </Button>
  )

  if (!slots) {
    return
  } else if (!slots.length) {
    return (
      <>
        {searchAgainButton}
        <p className="h5">No slots found. Try another date or duration.</p>
      </>
    )
  }

  return (
    <>
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {searchAgainButton}

      <p className="h5">
        Please choose one of the available slots for {slotDate(slots[0])}:
      </p>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            {slots.map(slot => (
              <Button key={slot.start_time} onClick={() => handleSlotBooking(slot)} size="lg" className="mb-2 w-100" variant="light">
                {slotStartTime(slot)} - {slotEndTime(slot)}
              </Button>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Slots
