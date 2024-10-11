import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import image1 from '../assets/hiRes/view1.webp'
import image2 from '../assets/hiRes/view2.webp'
import image3 from '../assets/hiRes/room1.webp'
import image4 from '../assets/hiRes/room2.webp'
import image5 from '../assets/hiRes/room3.webp'


export default function Home() {

    const hiResImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const [currImageIndex, setCurrImageIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrImageIndex((prevIndex) => (prevIndex + 1) % hiResImages.length)
        }, 2000)

        //cleanUp interval
        return () => clearInterval(intervalId);
    }, [hiResImages.length])

    return (
        <Container>
            <div>
                Welcome to Tropika & Co., a tranquil beachside retreat on the western coast of Malaysia, overlooking the serene waters of the Malacca Strait and the stunning Pangkor Island. Immerse yourself in the peaceful surroundings, where soft sands meet the gentle waves of the blue ocean. Guests are invited to unwind in this tropical paradise, where dolphins can occasionally be spotted dancing in the distance, adding a touch of magic to your stay. Experience relaxation and nature’s beauty at Tropika & Co.!
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                {hiResImages.map((image, index) => (
                    <img key={index} src={hiResImages[currImageIndex]} alt="Tropika Hotel" width="500px" height="500px" style={{ borderRadius: '10px', padding: '10px', backgroundColor: 'white', boxSizing: 'border-box', position: 'absolute', opacity: index === currImageIndex ? 1 : 0, transition: 'opacity 0.8s ease' }} />
                ))}
            </div>
        </Container>
    )
}
