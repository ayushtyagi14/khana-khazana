import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const NgoDashboard = () => {
    const router = useRouter()

    const [find, setFind] = useState(false)

    const [area, setArea] = useState()

    // const [formData, setFormData] = useState({
    //     area: '',
    // });

    // const handleInputChange = (event) => {
    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value
    //     });
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const raw = JSON.stringify(formData);

    //     var requestOptions = {
    //         method: 'POST',
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch("https://khanakhazana-backend.onrender.com/api/ngo/findRes", requestOptions)
    //         .then(response => response.text())
    //         .then(result => {
    //             console.log(result);
    //             const data = JSON.parse(result);
    //             console.log("DATA", data)
    //         })
    //         .catch(error => console.log('error', error));
    // }

    return (
        <>
            <div className="my-10 text-center border mx-auto md:w-1/2 flex flex-col items-center font-epilogue">
                <div className="flex flex-col">
                    <label>
                        Select your Area:
                        <span className="text-red-500 font-bold my-2">
                            *
                        </span>
                    </label>
                    <input
                        type="text"
                        className="border rounded px-4 py-2"
                        placeholder="Enter your Area"
                        name="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    />
                </div>
                <button className="my-5 border text-[20px] py-2 px-2 rounded-lg bg-[#09cc7f] text-white" onClick={() => setFind(true)}>Find Restaurants!</button>
            </div>
            {find && (<div className="font-epilogue border p-2 w-[25%] mx-auto rounded-lg shadow-xl flex flex-col items-center my-10">
                <img src="/food.jpeg" alt="food" />
                <div>ABC Restaurant</div>
                <div>{area}</div>
                <div>10 Kgs</div>
                <div>Veg</div>
                <div>4 ⭐</div>
                <p>Email: abc.restaurant@gmail.com</p>
                <p>Mobile Number: 999999999</p>
            </div>)}
        </>
    )
}

export default NgoDashboard;
