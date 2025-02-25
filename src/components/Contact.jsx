import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiMail, FiPhone, FiLinkedin, FiMapPin } from "react-icons/fi";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_q4vwdsp',
        'template_enmymwj',
        {
          from_name: form.name,
          to_name: "Timothy",
          from_email: form.email,
          to_email: "tanostimothy7@gmail.com",
          message: form.message,
        },
        'xbZcXbJaBvFJbhe75'
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you! I'll respond within 24 hours.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Message failed to send. Please try again.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {/* Contact Information Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-tertiary p-4 rounded-xl flex items-center gap-4">
            <FiMail className="text-white text-xl" />
            <div>
              <p className="text-white font-medium">Email</p>
              <a 
                href="mailto:tanostimothy7@gmail.com" 
                className="text-secondary text-sm hover:text-white transition-colors"
              >
                Gmail
              </a>
            </div>
          </div>

          <div className="bg-tertiary p-4 rounded-xl flex items-center gap-4">
            <FiPhone className="text-white text-xl" />
            <div>
              <p className="text-white font-medium">Whatsapp</p>
              <a 
                href="https://wa.me/+6282292958997?text=Hello%20Timothy%2C%20I%20found%20you%20through%20your%20portfolio..." 
                className="text-secondary text-sm hover:text-white transition-colors"
              >
                +6282292958997
              </a>
            </div>
          </div>

          <div className="bg-tertiary p-4 rounded-xl flex items-center gap-4">
            <FiLinkedin className="text-white text-xl" />
            <div>
              <p className="text-white font-medium">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/timothytannos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary text-sm hover:text-white transition-colors"
              >
                linkedin
              </a>
            </div>
          </div>

          <div className="bg-tertiary p-4 rounded-xl flex items-center gap-4">
            <FiMapPin className="text-white text-xl" />
            <div>
              <p className="text-white font-medium">Location</p>
              <p className="text-secondary text-sm">Jakarta, ID</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-white font-medium">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                required
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white font-medium">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                required
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white font-medium">Your Message</span>
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium resize-none"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-tertiary py-3 px-6 w-fit text-white font-bold rounded-xl shadow-md shadow-primary hover:bg-secondary transition-colors"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      {/* 3D Earth Canvas */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");