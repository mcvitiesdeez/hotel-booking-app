import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BookingCard from '../components/BookingCard';

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const BASE_URL = "https://0355ccf4-72bf-4ab0-a90f-3db58c9abe5b-00-2icy03l9zmvu3.sisko.replit.dev";

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/bookings`)
            setBookings(res.data)
        } catch (error) {
            console.error("Error:", error)
        }
    }

    useEffect(() => {
        fetchBookings();
    }, [])

    return (
        <Container>
            <h1>Booking List</h1>
            <Row>
                {bookings.map((booking) => (
                    <Col key={booking.id} md={4} className="mb-4">
                        <BookingCard booking={booking} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
