import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

export default function BookRoom() {
    const BASE_URL = "https://0355ccf4-72bf-4ab0-a90f-3db58c9abe5b-00-2icy03l9zmvu3.sisko.replit.dev";
    const [roomType, setRoomType] = useState("")
    const [noOfGuests, setNoOfGuests] = useState(0)
    const [notes, setNotes] = useState("")
    const [checkInDate, setCheckInDate] = useState("")
    const [checkOutDate, setCheckOutDate] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const navigate = useNavigate();

    const validateDates = () => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkOut < checkIn) {
            setAlertMessage("Check-Out Date must be after Check-In Date")
            setCheckOutDate("")
            return false;
        }
        setAlertMessage("")
        return true;
    }

    const handleSave = async () => {
        if (validateDates()) {
            //Prepare data to be sent
            const data = {
                room_type: roomType,
                no_of_guest: noOfGuests,
                notes: notes,
                check_in_date: checkInDate,
                check_out_date: checkOutDate,
            };

            //Make your API call here
            await axios
                .post(`${BASE_URL}/bookings`, data)
                .then((response) => {
                    console.log("Success:", response.data);
                })
                .catch((error) => {
                    console.error("Error", error);
                });
            navigate('/bookings')
        } else {
            console.log("Form is invalid. Check the error message")
        }
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formRoomType">
                    <Form.Label>Room Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        required
                    >
                        <option value="A">A - Single bed</option>
                        <option value="B">B - Double bed</option>
                        <option value="C">C - Family Suite</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNoOfGuest">
                    <Form.Label>Number of Guest</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter number of guest"
                        value={noOfGuests}
                        onChange={(e) => setNoOfGuests(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="note">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                        placeholder="Describe your needs"
                        as="textarea"
                        rows={3}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 w-25" controlId="formCheckInDate">
                    <Form.Label>Check-In date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Check-In date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3 w-25" controlId="formCheckOutDate">
                    <Form.Label>Check-Out date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Check-out date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                    />
                </Form.Group>
                {alertMessage && <p style={{ color: "red" }}>{alertMessage}</p>}
                <Button variant="primary" onClick={handleSave}>
                    Book a Room
                </Button>
            </Form>
        </Container>
    )
}
