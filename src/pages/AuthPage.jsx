import { Col, Image, Row, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../components/AuthProvider';

export default function AuthPage() {
    const [modalShow, setModalShow] = useState(null)
    const handleShowSignUp = () => setModalShow("SignUp")
    const handleShowLogin = () => setModalShow("Login")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            navigate("/bookings");
        }
    }, [currentUser, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => setModalShow(null);

    return (
        <div>
            <div>
                <Button className='rounded-pill' variant='outline-dark' onClick={handleGoogleLogin}>
                    <i className='bi bi-google'></i> Sign up with Google
                </Button>
                <p style={{ textAlign: "center" }}>or</p>
                <Button className='rounded-pill' onClick={handleShowSignUp}>Create an account</Button>
                <p style={{ fontSize: "12px" }}>By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use.</p>
                <p className='mt-5' style={{ fontWeight: "bold" }}>Already have an account?</p>
                <Button className='rounded-pill' variant="outline-primary" onClick={handleShowLogin}>Sign In</Button>
            </div>
            <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                <Modal.Body>
                    <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                        {modalShow === "SignUp"
                            ? "Create your account"
                            : "Log in to your account"}
                    </h2>
                    <Form className='d-grid gap-2 px-5' onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <p style={{ fontSize: "12px" }}>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                        </p>
                        <Button className='rounded-pill' type='submit'>{modalShow === "SignUp" ? "Sign Up" : "Log In"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
