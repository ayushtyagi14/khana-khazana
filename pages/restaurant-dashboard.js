import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const RestaurantDashboard = () => {

    const [userId, setUserId] = useState('')

    const resDetails = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://khanakhazana-backend.onrender.com/api/res/resDetails/${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setUserId('UserId', localStorage.getItem('userId'))
        resDetails()
    }, [])

    return (
        <>
            <div>
                THIS IS RESTAURANT DASHBOARD PAGE
            </div>
        </>
    )
}

export default RestaurantDashboard;
