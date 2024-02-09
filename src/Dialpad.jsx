import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import "./Dialpad.css"; // Import custom CSS for styling
// import "react-h5-audio-player/lib/styles.css";
import JsSIP from "jssip"; // Import JsSIP library
const Dialpad = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sipClient, setSipClient] = useState(null);

  useEffect(() => {
    const socket = new JsSIP.WebSocketInterface(
      ('ws://metalica.sip.us1.twilio.com/') 
    );
    const config = {
      sockets: [socket],
      uri:'sip:meta5775@metalica.sip.us1.twilio.com',
      authorization_user: 'meta5775',
      password: '*YtYb1@B1Dfc',
    };
    
    const client = new JsSIP.UA(config);

    setSipClient(client);

    // Start SIP client
    client.start();

    return () => {
      if (client) {
        client.stop();
      }
    };
  }, []);

  const makeCall = () => {
    if (sipClient) {
      // Replace 'destinationNumber' with the phone number you want to call
      const session = sipClient.call(
        'sip:destinationNumber@metalica.sip.us1.twilio.com',
        {
          mediaConstraints: { audio: true, video: false },
        }
      );

      session.on("accepted", () => {
        console.log("Call accepted");
      });

      session.on("failed", () => {
        console.log("Call failed");
      });
    }
  };

  const numberToAlphabetMap = {
    1: "",
    2: "ABC",
    3: "DEF",
    4: "GHI",
    5: "JKL",
    6: "MNO",
    7: "PQRS",
    8: "TUV",
    9: "WXYZ",
    0: " ",
  };

  const handleKeyPress = (key) => {
    setPhoneNumber((prevNumber) => prevNumber + key);
  };

  const handleKeyboardInput = (event) => {
    const { key } = event;
  
    if (/^[0-9*#+-]$/.test(key)) {
      handleKeyPress(key);
    } else if (key === "Backspace") {
      handleBackspace();
    } else if (key === " ") {
      // Handle spacebar press
      handleKeyPress("0"); // Assuming space should be mapped to "0"
    }
  };
  
  const handleBackspace = () => {
    setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
  };
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardInput);

    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, []);

  const [formData, setFormData] = useState({
    Voicemail: "History", // default value
  });

  const onEditChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
         <section>
          <div className="card">
            <div className="card-body phone-body mt-3">
              <div className="container">
                <div className="row  d-flex justify-content-around">

                  <div className="col-4">
                    <div className="container mt-5 text-center">
                      <div className="mb-1 position-relative">
                        <input
                          className="form-control"
                          type="text"
                          value={phoneNumber}
                          readOnly
                        />
                        {phoneNumber.length > 0 && (
                          <button
                            className="btn btn-danger position-absolute backspace "
                            onClick={handleBackspace}
                          >
                            <FontAwesomeIcon icon={faBackspace} />
                          </button>
                        )}
                      </div>
                      <div className="row row-cols-3 p-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((key) => (
                          <div key={key} className="col">
                            <button
                              className="btn btn-light rounded-circle btn-md number-button"
                              onClick={() => handleKeyPress(key.toString())}
                            >
                              {key}
                              <div className="alphabet">
                                {numberToAlphabetMap[key]}
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="row ">
                        <div className="col">
                          <button
                            className="btn btn-success phone rounded-circle"
                            onClick={makeCall}
                            disabled={phoneNumber.trim() === ""}
                          >
                            <FontAwesomeIcon icon={faPhoneVolume} />
                          </button>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col">
                          <button className="btn btn-primty ">
                            Calling Number : 098890327198
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Dialpad;


// const TableComponent1 = () => {
//   return (
//     <div className="container mt-3">
//       <table className="table ">
//         <tr>
//           <td className="text-start">
//             <strong className=" text-danger fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start">
//             <strong className=" text-danger fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start">
//             <strong className="fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start">
//             <strong className=" text-danger fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start ">
//             <strong className="fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start">
//             <strong className=" text-danger fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start">
//             <strong className=" text-danger fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start">
//             <strong className="fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start">
//             <strong className="fw-bold">Lena Oxton</strong>
//             <p>(217) 364-7643</p>
//           </td>
//           <td className="text-end">
//             <p>2:39PM</p>
//           </td>
//         </tr>
//       </table>
//     </div>
//   );
// };

// const TableComponent2 = () => {
//   return (
//     <div className="container mt-3">
//       <table className="table">
//         <tr>
//           <td className="text-start mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start  mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start  mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start  mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start  mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//       </table>
//     </div>
//   );
// };

// const TableComponent3 = () => {
//   return (
//     <div className="container mt-3">
//       <table className="table">
//         <tr>
//           <td className="text-start mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start  mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start  mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start  mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//         <tr>
//           <td className="text-start  mb-3">
//             <strong className="pl-4">(217) 364-7643</strong>
//             <ReactAudioPlayer className="w-100" src={horse} controls />
//           </td>
//         </tr>
//       </table>
//     </div>
//   );
// };
