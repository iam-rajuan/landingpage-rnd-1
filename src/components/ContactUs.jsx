import React, { useMemo, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const validateForm = (values) => {
  const nextErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    nextErrors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    nextErrors.message = "Message is required.";
  }

  return nextErrors;
};

const FieldError = ({ message }) =>
  message ? <p className="mt-2 text-sm text-red-300">{message}</p> : null;

const ContactUs = () => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const errors = useMemo(() => validateForm(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  const getError = (field) => (touched[field] || submitAttempted ? errors[field] : "");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setSuccessMessage("");
  };

  const handleBlur = (event) => {
    setTouched((currentTouched) => ({ ...currentTouched, [event.target.name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Thanks! Your message has been received.");
      setValues(initialValues);
      setTouched({});
      setSubmitAttempted(false);
    }, 700);
  };

  const inputClass =
    "w-full rounded-full border border-transparent bg-transparent px-4 py-3 text-white formBorder-gradient outline-none transition placeholder:text-gray-500 focus:border-[#3F5EFB]/70 focus:ring-2 focus:ring-[#3F5EFB]/20";

  return (
    <div id="contact" className="container mx-auto px-4 py-16">
      <div className="gap-10 lg:flex lg:px-32">
        <div className="flex-grow">
          <section className="w-full rounded-lg bg-gradient-to-l from-[#110D2E]/70 to-[#fc466a4a]/10 p-6 shadow-md sm:p-10 lg:p-16">
            <div className="mb-10 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold capitalize text-white">Drop Us Your Message</h2>
              <p className="mt-3 text-gray-400">Freely contact with us anytime. We're available here for you.</p>
            </div>

            <form noValidate onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass}
                    placeholder="Full Name"
                    aria-invalid={Boolean(getError("name"))}
                  />
                  <FieldError message={getError("name")} />
                </div>

                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass}
                    placeholder="Your Email"
                    aria-invalid={Boolean(getError("email"))}
                  />
                  <FieldError message={getError("email")} />
                </div>

                <div className="lg:col-span-2">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass}
                    placeholder="Select Subject"
                  />
                </div>

                <div className="lg:col-span-2">
                  <textarea
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="min-h-[150px] w-full rounded-3xl border border-transparent bg-transparent px-6 py-4 text-white formBorder-gradient outline-none transition placeholder:text-gray-500 focus:border-[#3F5EFB]/70 focus:ring-2 focus:ring-[#3F5EFB]/20"
                    placeholder="Message..."
                    rows={5}
                    aria-invalid={Boolean(getError("message"))}
                  />
                  <FieldError message={getError("message")} />
                </div>
              </div>

              {successMessage && (
                <p className="mt-5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100">
                  {successMessage}
                </p>
              )}

              <div className="mt-6 flex justify-start">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="min-h-11 rounded-full bg-[#6318F1] px-6 py-2 font-semibold text-white transition duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </section>
        </div>

        <aside className="mt-8 flex flex-col items-center justify-center rounded-lg border border-white/10 bg-[#110D2E]/50 px-6 py-6 lg:mt-0 lg:w-[24%]">
          <div className="flex flex-1 flex-col items-center justify-around">
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <FaPhoneAlt size={44} className="my-4 text-blue-500" />
              <div className="py-1 text-lg text-white">Phone</div>
              <div className="text-lg text-gray-400">0310 - 7756294</div>
            </div>
            <hr className="h-px w-32 border-0 bg-gradient-to-r from-[#FC466B] to-[#3F5EFB]" />
          </div>

          <div className="flex flex-1 flex-col items-center justify-around">
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <MdMarkEmailUnread size={44} className="my-4 text-blue-500" />
              <div className="py-1 text-lg text-white">Email</div>
              <div className="text-lg text-gray-400">hello@keepcodein.com</div>
            </div>
            <hr className="h-px w-32 border-0 bg-gradient-to-r from-[#FC466B] to-[#3F5EFB]" />
          </div>

          <div className="flex flex-1 flex-col items-center justify-around">
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <FaLocationDot size={44} className="my-4 text-blue-500" />
              <div className="py-1 text-lg text-white">Location</div>
              <div className="text-lg text-gray-400">Remote Worldwide</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ContactUs;
