import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: ''
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)

        const userType = localStorage.getItem('userType');
        const formDataWithUserType = { ...formData, userType };
        const raw = JSON.stringify(formDataWithUserType);

        const requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };

        fetch("https://khanakhazana-backend.onrender.com/api/user/login", requestOptions)
            .then(response => response.text(),)
            .then(result => {
                const data = JSON.parse(result);
                setLoading(false);
                if (data.resCode === 200) {
                    localStorage.setItem("name", data.name);
                    localStorage.setItem("authToken", data.authToken);
                    localStorage.setItem("userId", data.userId);
                    console.log("userId", data.userId);
                    localStorage.setItem("authenticated", true);
                    if (JSON.parse(userType) === 'Res') {
                        router.push('/restaurant-dashboard')
                    } else if (JSON.parse(userType) === 'NGO') {
                        router.push('/ngo-dashboard')
                    }
                    console.log(data.message)
                }
                else {
                    toast.error(
                        `${data.message}`,
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        }
                    );
                }
            })
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        // setDashboardType(localStorage.getItem("userType"));
    }, [])

    return (
        <>
            <div className='my-20 text-center border mx-auto md:w-1/2 flex flex-col items-center font-epilogue'>
                <h1 className='text-[30px]'>LogIn</h1>
                <form
                    className="flex flex-col justify-center space-y-5 md:w-[80%] w-full rounded-lg p-7"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col">
                        <label>
                            Email:
                            <span className="text-red-500 font-bold">
                                *
                            </span>
                        </label>
                        <input
                            type="email"
                            className="border rounded px-4 py-2"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>
                            Password:
                            <span className="text-red-500 font-bold">
                                *
                            </span>
                        </label>
                        <input
                            type="password"
                            className="border rounded px-4 py-2"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <span className="text-sm my-2 text-blue-800 cursor-pointer"
                        // onClick={() => router.push('/forgot_password')}
                        >
                            Forgot password?
                        </span>
                        <span className="text-sm my-2 text-blue-800 cursor-pointer"
                            onClick={() => router.push('/signup')}
                        >
                            Don&apos;t have an account?
                        </span>
                    </div>
                    <div className="flex flex-col">

                    </div>
                    <div className="flex justify-center">
                        {loading ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            <button
                                type="submit"
                                className="py-1 px-7 text-white font-bold bg-[#09cc7f] border rounded hover:text-[#09cc7f] hover:bg-white"
                            >
                                <span>LogIn</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;
