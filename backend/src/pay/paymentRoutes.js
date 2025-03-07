const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    const { cardNumber, expiry, cvv, name } = req.body;
    
    console.log("Received Payment Request:", { cardNumber, expiry, cvv, name });

    // Remove spaces before validation
    const cleanCardNumber = cardNumber.replace(/\s/g, '');

    // Validate card number (Luhn Algorithm)
    const validateCard = (card) => {
        const sum = card.split('').reverse().map((digit, index) => {
            let num = parseInt(digit);
            if (index % 2 !== 0) num *= 2;
            return num > 9 ? num - 9 : num;
        }).reduce((acc, val) => acc + val, 0);
        return sum % 10 === 0;
    };

    if (!validateCard(cleanCardNumber)) {
        return res.json({ success: false, message: "Invalid card details" });
    }

    if (!/^\d{3}$/.test(cvv)) {
        return res.json({ success: false, message: "Invalid CVV" });
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        console.log("Invalid Expiry:", expiry);
        return res.json({ success: false, message: "Invalid Expiry Date" });
    }

    console.log("✅ Payment Validated Successfully!");
    return res.json({ success: true });
});

module.exports = router;
