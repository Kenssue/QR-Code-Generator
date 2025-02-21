    let qrGenerated = false;

        function validateForm() {
            const lastname = document.forms["signupForm"]["lastname"].value;
            const firstname = document.forms["signupForm"]["firstname"].value;
            const level = document.forms["signupForm"]["level"].value;
            const section = document.forms["signupForm"]["section"].value;
            const idNumber = document.forms["signupForm"]["idNumber"].value;
            const course = document.forms["signupForm"]["course"].value;
            const set = document.forms["signupForm"]["set"].value;

            if (lastname && firstname && level && section && idNumber && course && set) {
                document.querySelector('.submit-btn').disabled = false;
            } else {
                document.querySelector('.submit-btn').disabled = true;
            }
        }

        function generateQRCode(event) {
            event.preventDefault();

            if (qrGenerated) {
                alert("You have already generated a QR code.");
                return;
            }

            const lastname = document.forms["signupForm"]["lastname"].value;
            const firstname = document.forms["signupForm"]["firstname"].value;
            const level = document.forms["signupForm"]["level"].value;
            const section = document.forms["signupForm"]["section"].value;
            const idNumber = document.forms["signupForm"]["idNumber"].value;
            const course = document.forms["signupForm"]["course"].value;
            const set = document.forms["signupForm"]["set"].value;

            const qrData = `${lastname}, ${firstname}, ${level}, ${section}, ${idNumber}, ${course}, ${set}`;

            const canvas = document.getElementById("qrCanvas");
            const ctx = canvas.getContext("3d");
            const qrSize = 350;  // Set the QR code size
            canvas.width = qrSize;
            canvas.height = qrSize;

            QRCode.toCanvas(canvas, qrData, { width: qrSize, margin: 1 }, function (error) {
                if (error) {
                    console.error(error);
                    alert("Error generating QR code!");
                    return;
                }

                qrGenerated = true;
                document.querySelector('.form-container').classList.add('qr-generated');
                document.querySelector('.qr-container').style.display = "block";

                const downloadBtn = document.getElementById("downloadBtn");
                downloadBtn.href = canvas.toDataURL("image/png");
                downloadBtn.download = "QR_Code.png";
                downloadBtn.style.display = "inline-block";
                downloadBtn.innerText = "Download QR Code";
            });
        }