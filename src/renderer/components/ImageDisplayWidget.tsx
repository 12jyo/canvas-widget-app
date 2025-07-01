import React, { useState, useEffect } from "react";

export default function ImageDisplayWidget({ src }: { src: string }) {
  const [currentSrc, setCurrentSrc] = useState<string>(
    "https://fastly.picsum.photos/id/172/300/200.jpg?hmac=VaIsmIVqK8M9b7c3_Kf6z48vuDlYyBGO9n3EE1xlmBk"
  );

  useEffect(() => {
    if (!src || src.trim() === "") {
      setCurrentSrc(
        "https://fastly.picsum.photos/id/172/300/200.jpg?hmac=VaIsmIVqK8M9b7c3_Kf6z48vuDlYyBGO9n3EE1xlmBk"
      );
    } else {
      setCurrentSrc(src);
    }
  }, [src]);

  const handleError = () => {
    setCurrentSrc(
      "https://fastly.picsum.photos/id/172/300/200.jpg?hmac=VaIsmIVqK8M9b7c3_Kf6z48vuDlYyBGO9n3EE1xlmBk"
    );
  };

  return (
    <>
      <p
        style={{
          color: "#f0f0f0",
          padding: "10px 14px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "500",
          marginBottom: "10px",
          maxWidth: "fit-content",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        📌 This is the <strong>Default Image</strong>. Click on the widget to
        change.
      </p>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "6px",
        }}
      >
        <img
          src={currentSrc}
          alt="uploaded"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          onError={handleError}
        />
      </div>
    </>
  );
}
