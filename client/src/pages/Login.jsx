import { useState } from 'react';
import axios from 'axios';
import './Login.scss';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [step, setStep] = useState(1); // 1: nhập số, 2: nhập mã
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    const sendAccessCode = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/CreateNewAccessCode', {
                phoneNumber: phone,
            });

            const newCode = res.data.accessCode;
            setAccessCode(newCode);
            setShowPopup(true);
        } catch (err) {
            setError('Gửi mã thất bại. Vui lòng thử lại.');
        }
    };

    const handleSendCode = async () => {
        await sendAccessCode();
    };

    const handleValidateCode = async () => {
        try {
            await axios.post('http://localhost:5000/api/ValidateAccessCode', {
                phoneNumber: phone,
                accessCode: code,
            });
            navigate('/dashboard'); // ✅ Chuyển hướng sau khi đăng nhập thành công

        } catch (err) {
            alert('❌ Mã xác thực không hợp lệ.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                {step === 1 && (
                    <>
                        <button className="back-btn" disabled>← Back</button>
                        <h2>Sign In</h2>
                        <p>Please enter your phone to sign in</p>
                        <input
                            type="text"
                            placeholder="Your Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button onClick={handleSendCode}>Next</button>
                        <p className="hint">Passwordless authentication methods.</p>
                        <p className="signup">Don't have an account? <a href="#">Sign up</a></p>
                    </>
                )}

                {step === 2 && (
                    <>
                        <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
                        <h2>Phone verification</h2>
                        <h3>Please enter your code that send to your phone</h3>
                        <p>We've sent a code to <strong>{phone}</strong></p>
                        <input
                            type="text"
                            placeholder="Enter Access Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button onClick={handleValidateCode}>Submit</button>
                        <button className="resend-btn" onClick={sendAccessCode}>Resend Code</button>
                    </>
                )}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>🧾 Mã xác thực: <strong>{accessCode}</strong></p>
                        <button onClick={() => {
                            setShowPopup(false);
                            setStep(2);
                        }}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}
