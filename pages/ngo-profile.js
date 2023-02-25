import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const NgoProfile = () => {
    const [userId, setUserId] = useState('')
    const [ngoDetail, setNgoDetail] = useState({})
    const [ngoId, setNgoId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [address, setAddress] = useState('')
    const [area, setArea] = useState('')
    const [ratings, setRatings] = useState('')
    const [authToken, setAuthToken] = useState('')

    const router = useRouter()

    const ngoDetails = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://khanakhazana-backend.onrender.com/api/ngo/ngoDetails/${userId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result);
                setNgoDetail(localStorage.setItem("ngoDetail", data))
                setAuthToken(localStorage.setItem("authToken", data.authToken))
                setNgoId(localStorage.setItem("ngoId", data.ngoId))
                setName(data.ngoName)
                setEmail(data.ngoEmail)
                setMobileNumber(data.ngoMobileNumber)
                setAddress(data.ngoAddress)
                setArea(data.ngoArea)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        setUserId(localStorage.getItem('userId'))
    }, [])

    useEffect(() => {
        if (userId.length > 0) {
            ngoDetails()
        }
    }, [userId])

    return (
        <>
            <div className="flex justify-between items-center py-4 px-8 bg-[#09cc7f] text-white">
                <img src="/temporary/assets/img/logo/logo.png" alt="logo" />
                <button className="text-lg font-medium border py-2 px-4 rounded-lg bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors" onClick={() => router.push('/login')}>
                    Logout
                </button>
            </div>

            <button className="ml-3 mt-2" onClick={() => router.push('/ngo-dashboard')}>
                Back to Dashboard
            </button>
            <div className="my-20 w-[80%] mx-auto font-epilogue flex flex-col items-center">
                <h1 className="text-[40px]"> {name}</h1>
                <h1 className="my-3">Email: {email}</h1>
                <h1 className="my-3">Contact Number: {mobileNumber}</h1>
                <p className="my-3">Address: {address}</p>
                <p className="my-3">Area: {area}</p>
            </div>
        </>
    )
}

export default NgoProfile
