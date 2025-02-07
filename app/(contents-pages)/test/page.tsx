export default function Page() {
    const resetUrl = "http://localhost:3000/reset-password"; // ใส่ URL ที่ต้องการ
  
    return (
      <div style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.6" }}>
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          <h2 style={{ color: "#4CAF50" }}>Password Reset Request</h2>
          <p>
            We received a request to reset your password. Click the button below
            to reset it:
          </p>
          <a
            href={resetUrl}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "16px",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            Reset Password
          </a>
          <p style={{ marginTop: "20px" }}>
            If you didn't request this, please ignore this email.
          </p>
          <p>Thank you,</p>
          <p>Your Company Name</p>
        </div>
      </div>
    );
  }
  