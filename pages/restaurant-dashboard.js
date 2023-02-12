import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const RestaurantDashboard = () => {

    const [userId, setUserId] = useState('')

    const router = useRouter()

    const resDetails = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://khanakhazana-backend.onrender.com/api/res/resDetails/${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result);
                setResId(localStorage.setItem("resId", data.resId))
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setUserId(localStorage.getItem('userId'))
    }, [])

    useEffect(() => {
        if (userId.length > 0) {
            resDetails()
        }
    }, [userId])

    return (
        <>
            <div className="text-center my-20 flex flex-col font-epilogue">
                <button className="text-[30px] border py-3 px-2 mx-auto rounded-lg bg-[#09cc7f] text-white" onClick={() => router.push('/donate')}>Make a Donation!</button>
                <button className="text-[30px] border py-3 px-2 mx-auto rounded-lg bg-black text-white mt-10" onClick={() => router.push('/restaurant-profile')}>Your Profile</button>
            </div>
        </>
    )
}

export default RestaurantDashboard;
