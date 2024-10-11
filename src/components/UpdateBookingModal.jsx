import { useContext, useState } from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateBookingModal({
    show, handleClose, bookingId, originalBookingContent
}) {

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    }

    const formattedCheckInDate = formatDate(originalBookingContent.check_in_date)
    const formattedCheckOutDate = formatDate(originalBookingContent.check_out_date)

    const BASE_URL = "https://0355ccf4-72bf-4ab0-a90f-3db58c9abe5b-00-2icy03l9zmvu3.sisko.replit.dev";
    const [newBookingContent, setNewBookingContent] = useState(originalBookingContent);
    const [roomType, setRoomType] = useState(originalBookingContent.room_type)
    const [noOfGuests, setNoOfGuests] = useState(originalBookingContent.no_of_guest)
    const [notes, setNotes] = useState(originalBookingContent.notes)
    const [checkInDate, setCheckInDate] = useState(formattedCheckInDate)
    const [checkOutDate, setCheckOutDate] = useState(formattedCheckOutDate)
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

    const handleUpdateBooking = async () => {
        if (validateDates()) {
            //Prepare data to be sent
            const data = {
                room_type: roomType,
                no_of_guest: noOfGuests,
                notes: notes,
                check_in_date: checkInDate,
                check_out_date: checkOutDate,
            };

            await axios.put(`${BASE_URL}/bookings/${bookingId}`, data)
                .then((response) => { console.log("Success:", response.data); })
                .catch((error) => { console.error("Error", error); });
            handleClose();
            navigate('/bookings')
        } else {
            console.log("Form is invalid. Check the error message")
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <h1>Update Booking ID: {bookingId}</h1>
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
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCheckInDate">
                            <Form.Label>Check-In date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Check-In date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCheckOutDate">
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
                        <Button className="mt-3" variant="primary" onClick={handleUpdateBooking}>
                            Update Booking
                        </Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
