import { FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const todayDate = new Date().toISOString().slice(0, 10)

  const [date, setDate] = useState(todayDate)
  const [duration, setDuration] = useState("15")

  function calculateSelectedDuration(duration: string): string {
    const parsedDuration = parseFloat(duration)
    const hours = Math.floor(parsedDuration / 60), minutes = parsedDuration % 60
    
    let hoursSection = "", minutesSection = ""
    if (hours) {
      hoursSection = `${hours} ${hours === 1 ? "hour" : "hours"}`
    }
    if (minutes) {
      minutesSection = `${minutes} minutes`
    }

    return `${hoursSection} ${minutesSection}`
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const params = new URLSearchParams({ date, duration }).toString()
    navigate(`/slots?${params}`)
  }

  return (
    <>
      <h2 className="mb-3">Welcome to Clumsy Squirrel Warehouse!</h2>
      <p className="h5">Use the form below to book a slot:</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="date" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setDate(e.target.value)}
            min={todayDate}
            value={date}
            required
          />
        </Form.Group>

        <Form.Group controlId="duration">
          <Form.Label>
            Duration selected
            {' '}
            <b>{calculateSelectedDuration(duration)}</b>
          </Form.Label>

          <Form.Range
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="15"
            max="480"
            step="15"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Check availability
        </Button>
      </Form>
    </>
  )
}

export default Home
