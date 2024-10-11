import axios from 'axios'
import { useState, useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap'
import UpdateBookingModal from './UpdateBookingModal';

export default function BookingCard(booking) {
    const { date_booking: dateBooking, time_booking: timeBooking, room_type: roomType, no_of_guest: noOfGuest, notes, check_in_date: checkInDate, check_out_date: checkOutDate } = booking.booking
    const BASE_URL = "https://0355ccf4-72bf-4ab0-a90f-3db58c9abe5b-00-2icy03l9zmvu3.sisko.replit.dev";

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    const handleRemoveBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`${BASE_URL}/bookings/${booking.booking.id}`)
        } catch (error) {
            console.error(error)
        } finally {
            window.location.reload();
        }
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    }

    const formatTime = (timeStr) => {
        return timeStr.slice(0, 5);
    }

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>Booking ID: {booking.booking.id}</Card.Title>
                        <Card.Text>Date Booking: {formatDate(dateBooking)}</Card.Text>
                        <Card.Text>Time Booking: {formatTime(timeBooking)}</Card.Text>
                        <Card.Text>Room Type: {roomType}</Card.Text>
                        <Card.Text>Number of Guest: {noOfGuest}</Card.Text>
                        <Card.Text>Notes: {notes}</Card.Text>
                        <Card.Text>Check-In Date: {formatDate(checkInDate)}</Card.Text>
                        <Card.Text>Check-Out Date: {formatDate(checkOutDate)}</Card.Text>
                        <Button variant="danger" onClick={handleRemoveBooking} className='me-2'><i className="bi bi-trash-fill"></i> Remove Booking</Button>
                        <Button variant="warning" onClick={handleShowUpdateModal}><i className="bi bi-pencil-square"></i> Update Booking</Button>
                        <UpdateBookingModal show={showUpdateModal} handleClose={handleCloseUpdateModal} bookingId={booking.booking.id} originalBookingContent={booking.booking} />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
