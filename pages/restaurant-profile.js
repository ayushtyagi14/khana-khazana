import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const RestaurantProfile = () => {
    const [userId, setUserId] = useState('')
    const [restaurantDetails, setRestaurantDetails] = useState({})
    const [resId, setResId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [address, setAddress] = useState('')
    const [area, setArea] = useState('')
    const [ratings, setRatings] = useState('')
    const [authToken, setAuthToken] = useState('')

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
                setRestaurantDetails(localStorage.setItem("restaurantDetail", data))
                setAuthToken(localStorage.setItem("authToken", data.authToken))
                setResId(localStorage.setItem("resId", data.resId))
                setName(data.resName)
                setEmail(data.resEmail)
                setMobileNumber(data.resMobileNumber)
                setAddress(data.resAddress)
                setArea(data.resArea)
                setRatings(data.stars)
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
            <button className="ml-3 mt-2" onClick={() => router.push('/restaurant-dashboard')}>
                Back to Dashboard
            </button>
            <div className="my-20 w-[80%] mx-auto font-epilogue flex flex-col items-center">
                <h1 className="text-[40px]"> {name}</h1>
                <h1 className="my-3">Email: {email}</h1>
                <h1 className="my-3">Contact Number: {mobileNumber}</h1>
                <p className="my-3">Address: {address}</p>
                <p className="my-3">Area: {area}</p>
                <span className="my-3">Ratings: {ratings}⭐</span>
            </div>
        </>
    )
}

export default RestaurantProfile;
