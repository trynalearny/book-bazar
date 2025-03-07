import React, { useState } from "react";
import Swal from "sweetalert2";
import backgroundImg from '../../assets/background.jpg';


const EnquiryPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "",
        bookName: "",
        author: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("access_key", "d8b680f3-b0aa-4a30-8489-5263cc5b8d11"); // Replace with your Web3Forms Key
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("bookName", formData.bookName);
        formDataToSend.append("author", formData.author);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formDataToSend,
        });

        const result = await response.json();

        if (result.success) {
            Swal.fire({
                title: "Enquiry Sent!",
                text: "We will get back to you soon.",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });
            setFormData({ name: "", email: "", category: "", bookName: "", author: "" });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
            });
        }
    };

    return ( <section style={{ backgroundImage: `url(${backgroundImg})`,
        backgroundPosition: 'center',
    display: 'flex',      justifyContent: 'center',      alignItems: 'center',      padding: '2rem',      backgroundSize: 'cover'
  }}>
        <div className="container mx-auto p-6 max-w-2xl flex">
            <div className="w-1/2 bg-white shadow-md p-6 rounded-lg mr-4">
                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <br></br>
                <h3>Email: <a href="mailto:bookbazaar@gmail.com">bookbazaar@gmail.com</a></h3>
                <br></br>
                <h3>Phone: +91 1234567890</h3>
                <br></br>
                <h3>For book enquiries or any book requests, please feel free to ask!</h3>
            </div>
            <div className="w-1/2 bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Book Enquiry Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Book Category (e.g., Fiction, Science)"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="bookName"
                        placeholder="Book Name"
                        value={formData.bookName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Book Author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Send Enquiry
                    </button>
                </form>
            </div>
        </div>
        </section>
    );
};

export default EnquiryPage;
